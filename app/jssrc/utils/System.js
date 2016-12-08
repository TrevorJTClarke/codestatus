/**
 * System
 * Singleton to control inner funcitons/tracking
 */
import { API } from './Api';
import { Cookie } from './Cookie';

// Used for deep linking
// DO NOT MOVE
window.handleOpenURL = window.handleOpenURL || function (url) {
  window.deepUrl = url
  /*eslint no-console: ["error", { allow: ["log"] }] */
  console.log('url', url)
  cordova.fireDocumentEvent('handleopenurl', { url: url })
}

var createNotificationListeners = function () {
  window.deploy = window.deploy || {}
  window.notification = window.notification || {}
  window.nativity = window.nativity || {}
  window.nativity.system = window.nativity.system || {}

  if ('cordova' in window) {
    // Create a sticky event for handling the app being opened via a custom URL
    cordova.addStickyDocumentEventHandler('handleopenurl')
    cordova.fireDocumentEvent('userrebaseimmediate', {})
  }

  // iOS
  window.onNotificationAPN = window.onNotificationAPN || function (data) {
    window.notification = data
    cordova.fireDocumentEvent('handlenotification', { data })
  }

  // Android
  window.onNotificationGCM = function (e) {

    switch (e.event){
      case 'registered':
        if (e.regid.length > 0) {
          // console.log('registerdevice', { data: e })
          localStorage.setItem('ct-device', JSON.stringify({ data: e }))
          cordova.fireDocumentEvent('registerdevice', { data: e })
        }

        break;

      case 'message':
        window.notification = e
        e.payload.foreground = e.foreground
        cordova.fireDocumentEvent('handlenotification', { data: e.payload })
        break;

      case 'error':
        break;

    }
  }

  document.addEventListener('handleopenurl', function (url) {
    window.deepUrl = url
    cordova.fireDocumentEvent('handleopenurl', { url: url })
  }, false)

  document.addEventListener('registerdevice', function (e) {
    console.log('registerdevice event!1', e)
    localStorage.setItem('ct-device', JSON.stringify({ data: e }))
  }, false)

  if (window.deepUrl && window.deepUrl.length > 1) {
    cordova.fireDocumentEvent('handleopenurl', { url: window.deepUrl })
  }
}

document.addEventListener('deviceready', createNotificationListeners, false)
document.addEventListener('resume', createNotificationListeners, false)

function System($rootScope, $http, $q) {

  return {

    C: new Cookie,

    API: new API,

    /**
     * System-wide Data
     */
    data: function () {
      // let data = Config.SYS
      data.device = ionic.Platform.device()
      data.isWebView = ionic.Platform.isWebView()
      data.isIPad = ionic.Platform.isIPad()
      data.isIOS = ionic.Platform.isIOS()
      data.isAndroid = ionic.Platform.isAndroid()
      data.isWindowsPhone = ionic.Platform.isWindowsPhone()
      // data.channel = Config.Ionic.deployChannel || 'none'
      data.os = ionic.Platform.platform()
      data.uuid = this.uuid()

      return data
    },

    // TODO: move to Offline handler
    isOnline: function () {
      if (!navigator || !navigator.hasOwnProperty('onLine')) {
        // TODO: verify if we have other values
        return false
      }

      return navigator.onLine
    },

    // TODO: move to Offline handler
    status: function () {
      return (this.isOnline) ? 'online' : 'offline'
    },

    configureDefaults: function () {
      if (window.StatusBar) {
        StatusBar.styleDefault()
      }

      if (window.navigator && window.navigator.splashscreen) {
        setTimeout(() => {
          navigator.splashscreen.hide()
        }, 200)
      }

      this.initPush()

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      this.toggleKeyboardBoard(true)
      this.toggleKeyboardScroll(true)

      // TODO: TESTING ONLY!!!!!!!!!!!!!!!!
      ionic.keyboard.disable()
    },

    // toggles the keyboard extras bar
    toggleKeyboardBoard: function (bool) {
      // if (typeof bool !== 'undefined') {
      //   window.nativity.system = window.nativity.system || {}
      //   window.nativity.system.keyboardToggle = bool
      // } else if (!window.nativity.system || typeof window.nativity.system.keyboardToggle === 'undefined') {
      //   window.nativity.system = window.nativity.system || {}
      //   window.nativity.system.keyboardToggle = false
      // } else {
      //   window.nativity.system.keyboardToggle = !window.nativity.system.keyboardToggle
      // }

      // We need this:
      // if (window.cordova && window.cordova.plugins.Keyboard) {
      //   // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(window.nativity.system.keyboardToggle)
      // }
    },

    // stops the view from jumping
    toggleKeyboardScroll: function (bool) {
      let tmp = bool || true

      // We need this:
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.disableScroll(tmp)
      }
    },

    deploy: function () {
      if (!Ionic || !Ionic.Deploy) return
      window.deploy = window.deploy || new Ionic.Deploy()
      // window.deploy.setChannel(Config.Ionic.deployChannel)

      return window.deploy
    },

    // Called for each notification for custom handling
    notification: function (n) {
      $rootScope.$emit('PUSH:DATARECEIVED', n.data)
    },

    initPush: function () {
      if (window.plugins && window.plugins.pushNotification) {
        window.nativity = window.nativity || {}
        window.nativity.pushInstance = window.plugins.pushNotification
        document.addEventListener('registerdevice', this.registerDevice, false)
        document.addEventListener('handlenotification', this.notification, false)
      }
    },

    hasPush: function () {
      return (window.nativity && window.nativity.pushInstance)
    },

    registerPush: function (userData) {
      if (!this.hasPush()) return
      var _this = this

      // blocks this flow if we other params are not met
      var ctPushReg = (userData.meta && userData.meta.native && userData.meta.native.hasOwnProperty('pushRegistered')) ? userData.meta.native.pushRegistered : null
      var pushReg = (typeof ctPushReg !== undefined) ? ctPushReg : null
      var ctPushCk = this.C.get('ct-push')
      var pushCookie = (typeof ctPushCk !== undefined) ? ctPushCk : null

      // RULES:
      // 1. if we said "not now"(ct-push=false) stop here
      // 2. if registerPush === false stop here
      // 3. if registerPush === true or ct-push === true its okay keep going
      if (pushReg === false) return; //??
      if (pushCookie === false || pushCookie === 'false') return;

      var ios = {
        badge: 'true',
        sound: 'true',
        alert: 'true',
        ecb: 'onNotificationAPN'
      }
      var android = {
        senderID: '964559878960', // TODO: cahnge to config
        ecb: 'onNotificationGCM'
      }

      // quick store data
      // TODO: Check if user has already registered inside meta
      window.nativity.user = userData

      function errorHandler() {
        Onboarding.setKey('pushRegistered', false)
      }

      function successHandler() {
        Onboarding.setKey('pushRegistered')
      }

      // One last step before starting register
      createNotificationListeners()

      // Register away!
      if (device.platform == 'android' || device.platform == 'Android') {
        window.nativity.pushInstance.register(
          _this.registerDevice,
          errorHandler,
          android
        );
      } else {
        window.nativity.pushInstance.register(
          _this.registerDevice,
          errorHandler,
          ios
        );
      }
    },

    // WARNING! dangerous to unregister (results in loss of tokenID)
    // TODO: Needs to be in place upon logout
    unregisterPush: function () {
      // window.nativity.system.pushInstance.unregister()
    },

    /**
     * Store user device token with API
     */
    registerDevice: function (res) {
      // dont allow actual push to come through, only device tokens
      if (!res || res === 'OK') return;
      if (res && res.data && res.data.event !== 'registered') return;
      var _this = this
      var _API = new API // because its inside a window function now
      var token = (res && res.data && res.data.regid) ? res.data.regid : res
      if (token === 'OK') {
        let tempToken = JSON.parse(localStorage.getItem('ct-device'))
        token = tempToken.data.regid
        if (token === 'OK') return;
      }

      // Store the key for user
      Onboarding.setKey('pushRegistered')

      // storing on the user
      if (!window.nativity.user || !window.nativity.user.id) return

      let androidTokens = (window.ionic.Platform.isAndroid()) ? [token] : null
      let iosTokens = (window.ionic.Platform.isIOS()) ? [token] : null
      let url = _API.base('ionic-device-listener')
      let registerPayload = {
        _push: {
          android_tokens: androidTokens,
          ios_tokens: iosTokens
        },
        unregister: false,
        // app_id: Config.Ionic.APP_ID,
        user_id: window.nativity.user.id,
        is_on_device: true
      }
      console.log('registerPayload', registerPayload)

      $http.post(url, registerPayload)

      // clear the window.notification
      window.notification = {}
    },

    /**
     * Set a number as the badge count, optional callback
     */
    badge: function (num, cb) {
      if (!this.hasPush()) return;
      cb = cb || function () {}

      window.nativity.pushInstance.setApplicationIconBadgeNumber(cb, function () {}, parseInt(num, 10))
    },

    getPicture: function () {
      let dfd = $q.defer()
      if (!window.Camera) {
        dfd.reject('No Device')
        return dfd.promise
      }

      let options = {
        quality: 75,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 600,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      }

      // $cordovaCamera.getPicture(options)
      //   .then((imageData) => {
      //     dfd.resolve(`data:image/jpeg;base64,${imageData}`)
      //   }, dfd.reject)

      return dfd.promise
    },

    takePicture: function () {
      let dfd = $q.defer()
      if (!window.Camera) {
        dfd.reject('No Device')
        return dfd.promise
      }

      let options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 600,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }

      // $cordovaCamera.getPicture(options)
      //   .then((imageData) => {
      //     dfd.resolve(`data:image/jpeg;base64,${imageData}`)
      //   }, dfd.reject)

      return dfd.promise
    },

    // Share via native share sheet
    // social: $cordovaSocialSharing,

    // External navigation helper (NOTE: requires inappbrowser)
    navigate: function (endpoint, params, useToken) {
      // let url = `${Config.WEB.HOST}/app/`
      let token = this.C.get('token')
      let paramString = ''

      // loop and add params
      for (let k in params) {
        paramString += `&${k}=${JSON.stringify(params[k])}`
      }

      paramString = `?${paramString.substring(1, paramString.length)}`

      // only add token if we should
      url = (useToken) ? `${url}${token}/${endpoint}` : `${url}${endpoint}`
      url = url + paramString

      // redirect the user to the native browser to allow the finished transaction
      window.open(encodeURI(url), '_system')

    },

    navigateExternal: (url) => {
      window.open(encodeURI(url), '_system')
    },

    uuid: () => {
      if (window.device && device.uuid) {
        return device.uuid
      } else {
        return null
      }
    }

  }
}

export { System }
