// import { Config } from '../utils';

/**
 * imgError
 * error handling for images
 *
 * USE:
 * <img img-error />
 */
module.exports = () => {

  // normal angular stuff
  return {
    restrict: 'EA',
    link: () => {

      // let noImageClass = 'noImageClass'
      // let backupImg = 'img/no-image.svg'
      //
      // // TODO: Assess the OFfline problem!
      // // elem.addClass(noImageClass)
      //
      // elem.bind('error', () => {
      //   attrs.$set('src', backupImg)
      // })
      //
      // attrs.$observe('ngSrc', (value) => {
      //   if (!value) {
      //     attrs.$set('src', backupImg)
      //   }
      // })
    }
  }
};
