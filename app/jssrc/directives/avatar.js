/**
 * Avatar Directive
 *
 * EXAMPLES:
 * <avatar data="object"></avatar>
 * <avatar data="object" size="lg"></avatar>
 * <avatar data="object" size="xl"></avatar>
 * <avatar data="object" size="xs" border="light"></avatar>
 * <avatar data="object" size="sm" border="dark"></avatar>
 * <avatar size="xs" border="dark" initials="tc"></avatar>
 * <avatar data="object" size="sm" company="true"></avatar>
 *
 * OPTIONS:
 *  - data - object containing needed avatar data (see below) REQUIRED
 *  - size - xs, sm, md (default), lg, xl
 *  - company - changes default background image, uses different data
 *  - initials - shows user initials instead of image if no image found
 *  - border - light, dark
 *
 * Expected Data:
 * {
 * 		user: {
 * 			firstName: 'Trevor',
 * 			lastName: 'Clarke',
 * 			imageId: '328490',
 * 			imageVersion: 'v23324328490'
 * 		}
 * 		// or for company
 * 		organization: {
 * 			logoId: '328490',
 * 			logoVersion: 'v23324328490'
 * 		}
 * }
 */
module.exports = function ($http, $timeout) {
  const trans = 'avatar_thumb_lg'
  const defaults = {
    size: 'md',
    type: 'user',
    user: Config.CDN.user,
    company: Config.CDN.company
  }

  // creates a dynamic url based on version and id,
  // returns an ngSrc ready url
  //  + Config.CDN[`${type}DefaultUrl`]
  function createUrl(version, id, type, transform) {
    if (!version || !id) return ''
    transform = transform || trans

    let file = (id.indexOf('.') > -1) ? '' : '.jpg'
    type = type || defaults.user
    version = (version || Config.CDN[`${type}DefaultVersion`]) + '999/'
    id = id || Config.CDN[`${type}DefaultId`]
    return Config.CDN.url + `t_${transform},d_default.jpg/${version}${id}${file}`.replace('\/\/', '/')
  }

  // normal angular stuff
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      data: '=',
      size: '@?',
      border: '@?',
      initials: '@?',
      company: '@?',
      charity: '@?',
      imgSrc: '=?',
      transform: '=?'
    },
    template: `
      <div class="avatar avatar-{{size}}" ng-class="{ 'avatar-border': border, 'border-dark': border == 'dark', 'avatar-initials': initials, 'avatar-company': company == 'true' }">
        <div ng-if="initials" class="initials">{{initials}}</div>
        <img ng-src="{{imgSrc}}" />
      </div>
    `,
    link: function (scope, elem, attrs) {
      let isUser = (typeof scope.company !== undefined && scope.company == 'true') ? false : true
      let isCharity = (typeof scope.charity !== undefined && scope.charity == 'true')
      let imgType = (isUser) ? 'user' : 'company'
      let backupImg = (isUser) ? defaults.user : defaults.company
      let finalImagePath

      // basic setup
      scope.size = scope.size || defaults.size
      scope.imgSrc = backupImg
      $timeout(() => {}, 10)

      // check for data first, if not default to stuff
      function checkData() {
        let imgVersion
        let imgId

        if (!scope.data) {
          finalImagePath = (isUser) ? defaults.user : defaults.company
        } else {
          if (!isUser && !isCharity && scope.data && scope.data.organization && scope.data.organization.logoVersion) {
            imgVersion = scope.data.organization.logoVersion
            imgId =  scope.data.organization.logoId
          } else if (!isUser && isCharity && scope.data && scope.data.charity && scope.data.charity.logoVersion) {
            imgVersion = scope.data.charity.logoVersion
            imgId =  scope.data.charity.logoId
          } else if (scope.data.imageVersion) {
            imgVersion = scope.data.imageVersion
            imgId = scope.data.imageId
          } else if (scope.data && scope.data.user && scope.data.user.imageVersion) {
            imgVersion = scope.data.user.imageVersion
            imgId = scope.data.user.imageId
          } else if (scope.data && scope.data.inviter && scope.data.inviter.imageVersion) {
            imgVersion = scope.data.inviter.imageVersion
            imgId = scope.data.inviter.imageId
          } else if (scope.data && scope.data.creator && scope.data.creator.imageVersion) {
            imgVersion = scope.data.creator.imageVersion
            imgId = scope.data.creator.imageId
          }

          // change cropping transform style if its company
          if (imgType === 'company') {
            scope.transform = 'avatar_thumb_company'
          }

          // setup the dynamic url
          finalImagePath = createUrl(imgVersion, imgId, imgType, scope.transform)
        }

        // final check, if user is anomnoms, only show default avatar
        if (scope.data && scope.data.payload && scope.data.payload.isPublic === false) {
          finalImagePath = 'https://res.cloudinary.com/cotribute/image/upload/t_avatar_thumb,d_default.jpg/avatar.jpg'
        }

        // apply path
        scope.imgSrc = finalImagePath
      }

      // initial check
      $timeout(checkData, 1)

      attrs.$observe('ngSrc', function (ngSrc) {
        $http.get(ngSrc)
          .success(checkData)
          .error(() => {
            // set default image
            elem.attr('src', backupImg)
          })
      })

      // watch for changes to data
      scope.$watch('data', () => {
        checkData()
      })
    }
  }
};
