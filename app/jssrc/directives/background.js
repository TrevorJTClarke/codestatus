/**
 * background
 * dynamically select a background based on the string's first char
 *
 * USE:
 * <div background="itemIndex"></div>
 */
module.exports = () => {

  // normal angular stuff
  return {
    restrict: 'EA',
    scope: {
      background: '='
    },
    link: (scope, elem) => {
      let patterns = ['shippo', 'seigaiha', 'diagonal-stripes', 'honey-comb', 'carbon', 'weave', 'microbial']
      let pattern = patterns[0]
      let idx = scope.background

      // assign the pattern
      for (var i = 0; i < patterns.length; i++) {
        if (idx % i === 0) {
          pattern = patterns[i]
        }
      }

      // change the background here!
      angular.element(elem).addClass(`pt-${pattern}`)
    }
  }
};
