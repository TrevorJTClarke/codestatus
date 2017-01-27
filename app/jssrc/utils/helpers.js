/*
 * Helpers
 * A set of helpful little functions
 **/

function Helpers() {

  return {

    formatData: function (data) {
      var fin = []

      if (data.projects) {
        for (var k in data.projects) {
          if (data.projects.hasOwnProperty(k)) {
            var tmpEnvs = []

            for (var e in data.projects[k]) {
              if (data.projects[k].hasOwnProperty(e)) {

                tmpEnvs.push({
                  name: e || '',
                  areas: [data.projects[k][e]] || []
                })
              }
            }
          }

          fin.push({
            name: k || '',
            envs: tmpEnvs || []
          })
        }
      }

      return fin
    }

  }
}

export { Helpers }
