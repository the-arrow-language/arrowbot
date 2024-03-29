/**
 * File System Module
 */
const fs = require('fs')

/**
 * This callback is returns errors
 * @callback runtimeCallback
 * @param {String} err
 * @param {Function} func
 */

/**
 * Arrow Lanugage Runtime
 * @param {String} filepath Path to .arr File
 * @param {runtimeCallback} cb callback
 */
function runtime (filepath, cb) {
  const data = filepath

  // eslint-disable-next-line no-unused-vars
  let converted = ''
  let linebyline = data.split('\n')
  for (let PC = 0; PC < linebyline.length; PC++) {
    const line = linebyline[PC].split('=>')[0]
    const lineArr = line.split('<')
    const cmd = lineArr[0] ? lineArr[0].trim().toLowerCase() : ''
    const arg0 = lineArr[1] ? lineArr[1].trim() : ''

    switch (cmd) {
      case 'modl':
        if (fs.existsSync(arg0)) {
          fs.readFile(arg0, (moErr, moData) => {
            if (moErr) cb(moData)
            moData = moData.toString('utf-8')
            linebyline[PC] = ''
            linebyline = moData.split('\n').concat(linebyline)
            PC = (-1)
          })
        }
        break

      case 'con':
        converted += '$msg.channel.send(' + arg0 + ')'
        break

      case 'con.err':
        converted += '$msg.channel.send(\'Error: \' + ' + arg0 + ')'
        break

      case 'con.dir':
        converted += '$msg.channel.send(JSON.stringify(' + arg0 + '))'
        break

      case 'exit':
        converted += '$msg.channel.send(\'Returns: \'' + arg0 + ')'
        break

      case 'if':
        converted += 'if (' + arg0 + ') {'
        break

      default:
        if (cmd && arg0) {
          converted += 'let ' + cmd + ' = ' + arg0
        }
        break
    }
    if (line.endsWith('->')) converted += '}'
    converted += '\n'
  }
  // eslint-disable-next-line no-new-func
  converted = new Function('$msg', converted)
  cb(null, converted)
}

exports.runtime = runtime
