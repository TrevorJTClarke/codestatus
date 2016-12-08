/**
 * HTML Inline Angular Templates
 */
'use strict';
var fs = require('fs')
var path = require('path')

function templatify(folderPath, output, source) {
  var LT_BANG = /<!--.*?-->/igm
  var validFiles = []
  var validTemplates = []

  // stop if we dont have valid info
  if (!folderPath || !output || !source) return

  // reads all files from specified folder
  function getAllFilePaths(folder) {
    return fs.readdirSync(path.join(folder))
  }

  // returns only files that exist, warn about deadlies
  function getValidFiles(inputs, cb) {
    inputs.forEach(function (input) {
      // Warn on and remove invalid source files (if nonull was set).
      fs.exists(path.join(`../${folderPath}/${input}`), function (exists) {
        if (exists) {
          console.warn('Source file ${input} not found.')
        } else if (input !== '.DS_Store') {
          validFiles.push(input)
        }

        if (input === inputs[inputs.length - 1] && cb) {
          cb(validFiles)
        }
      })
    })
  }

  // returns simple script snippet
  function createTemplate(filepath) {
    var ctx = fs.readFileSync(path.join(`${folderPath}/${filepath}`), { encoding: 'utf8' })
    var content = ctx.replace(LT_BANG, '')
    var cc = content.replace(/\s+|\n|\t/g, ' ')
    return `<script type="text/ng-template" id="templates/${filepath}">\n${cc}\n</script>`
  }

  // returns array of script snippets
  function generateTemplates(templateFiles) {
    for (var i = 0; i < templateFiles.length; i++) {
      var tmpItem = createTemplate(templateFiles[i]);
      validTemplates.push(tmpItem);
    }

    return validTemplates
  }

  // reads all files, creates html strings with scripts, places inline to specified output file.
  return (function () {

    // 1. Get files to prepare
    var allFiles = getAllFilePaths(folderPath)

    // 2. double check all files are valid
    getValidFiles(allFiles, function (paths) {
      // 3. run through all templates and generate an html scripts array
      var readyScripts = generateTemplates(paths) || []

      // 4. save all to a compiled file
      var finalScripts = readyScripts.join(',').replace(/\>,\</g, '>\n<')

      // 5. inject all scripts into output file
      fs.readFile(path.join(source), { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        var sections = data.split('{{TEMPLATES}}')
        var finalString = `${sections[0]}\n${finalScripts}\n${sections[1]}`

        fs.writeFileSync(path.join(`${output}`), finalString)
      })
    })
  })()
}

// process cli args
var f
var o
var s
process.argv.forEach((val, index, array) => {
  var tmp

  if (val) {
    val = val.split('=')
    if (val[0] === 'folder') f = val[1]
    if (val[0] === 'output') o = val[1]
    if (val[0] === 'source') s = val[1]
  }
})

// start the template task upon valid args
templatify(f, o, s)

module.exports = templatify
