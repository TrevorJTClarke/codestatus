/**
 * Configuration Task
 */
'use strict';
var fs = require('fs')
var path = require('path')

// Helper
// Code from: https://github.com/rxaviers/cldr
// NOTE: Using helper function until Object.assign has deep support
var merge = function () {
  var destination = {}
  var sources = [].slice.call(arguments, 0)

  sources.forEach(function (source) {
    for (var prop in source) {
      if (prop in destination && Array.isArray(destination[prop])) {
        // Concat Arrays
        destination[prop] = destination[prop].concat(source[prop])
      } else if (prop in destination && typeof destination[prop] === 'object') {
        // Merge Objects
        destination[prop] = merge(destination[prop], source[prop])
      } else {
        // Set new values
        destination[prop] = source[prop]
      }
    }
  })

  return destination
};

function initialize(environment) {
  var configFile = 'config.json'

  // read all environment related configs
  var pkg = require(`./../package`)

  // Quick variable additions
  common.SYS = {
    environment,
    time: (+new Date()),
    version: pkg.version
  }

  // munge away my love
  var config = merge(common, envConfig)

  // write the config file where we needz it
  fs.writeFileSync(`app/jssrc/utils/ConfigData.js`, `var ConfigData = ${JSON.stringify(config).replace(/\{/g, '{ ').replace(/\}/g, ' }')}\n export { ConfigData }`)

  // change only items we need inside config.xml
  fs.readFile(path.join('config/index.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) throw err;
    var finalString = data.replace(/CF_id/g, config.id).replace(/CF_name/g, config.name).replace(/CF_version/g, pkg.version)

    fs.writeFileSync(path.join('config.json'), finalString)
  })
}

// process cli args
var e
process.argv.forEach((val, index, array) => {
  var tmp

  if (val) {
    val = val.split('=')
    if (val[0] === 'envc') e = val[1]
  }
})

// start the task upon valid args
initialize(e)
