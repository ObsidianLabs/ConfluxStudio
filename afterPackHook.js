const os = require('os')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

exports.default = async function(context) {
    // not macs

      const files = fs.readdirSync(path.join(__dirname, 'dist'))
      const dmgs = files.filter(file => /.*\.dmg$/.test(file))

      if (dmgs.length === 0) return
      else if (dmgs.length === 2) {
        const dmg = dmgs.find(file => file.indexOf('x64') === -1)
        const filename = dmg.slice(0, -4)
        const newFileName = `${filename}-arm64.dmg`
        fs.renameSync(path.join(__dirname, 'dist', dmg), path.join(__dirname, 'dist', newFileName))
      } else {
        const dmg = dmgs[0]
        const filename = dmg.slice(0, -4)
        const newFileName = `${filename}-x64.dmg`
        fs.renameSync(path.join(__dirname, 'dist', dmg), path.join(__dirname, 'dist', newFileName))
        execSync(`export APPLE_CPU=m1 && yarn run dist`)
      }
  }