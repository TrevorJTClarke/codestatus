/**
 * Video Thumb Directive
 * Displays a default video thumbnail with a play icon
 *
 * EXAMPLES:
 * <video-thumb id="String"></video-thumb>
 *
 * OPTIONS:
 *  - id - youtube id data (see below) REQUIRED
 *
 * Expected Data:
 * id: 'jkfds9877'
 */
module.exports = ($http, $timeout, $sce) => {
  var defaultThumb = 'img/no-video.svg'

  // creates a dynamic url based on id,
  // returns an ngSrc ready url
  function createUrl(id) {
    return $sce.trustAsUrl(`https://i.ytimg.com/vi/${id}/0.jpg`) //mqdefault, maxresdefault
  }

  function createSafeVideoUrl(id) {
    return $sce.trustAsResourceUrl(`http://www.youtube.com/embed/${id}?rel=0`)
  }

  // TODO: add click and autoplay, no rel!
  // <iframe ng-src="{{videoSrc}}" frameborder="0" allowfullscreen></iframe>

  // normal angular stuff
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      id: '=',
      click: '=?'
    },
    template: `
      <div class="video-container">
        <img ng-src="{{imgSrc}}" src="${defaultThumb}" />
        <iframe class="video-iframe" ng-src="{{videoSrc}}" frameborder="0" allowfullscreen></iframe>
      </div>
    `,
    link: (scope, elem, attrs) => {
      // apply path
      scope.imgSrc = createUrl(scope.id)
      scope.videoSrc = createSafeVideoUrl(scope.id)

      // only bind the click if we need it, otherwise show image placeholder
      if (scope.click === undefined || scope.click === true) {
        elem.on('click', function (e) {
          elem.addClass('playing')
          e.preventDefault()

          $timeout(function () {
            angular.element(elem).find('iframe')[0].src += '&autoplay=1'
          }, 120)
        })
      } else {
        elem.addClass('no-play')
      }

      attrs.$observe('ngSrc', (ngSrc) => {
        $http.get(ngSrc)
          .error(() => {
            // set default image
            elem.attr('src', defaultThumb)
          })
      })
    }
  }
};
