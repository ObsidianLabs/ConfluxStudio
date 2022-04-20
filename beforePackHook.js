const MACARM = 3

const { execSync } = require('child_process')

exports.default = async function(context) {
    // your custom code
    if (context.arch === MACARM && context.platform.name === "mac") {
      console.log("RUN export APPLE_CPU=m1 && yarn build")
      await execSync(`export APPLE_CPU=m1 && yarn build`)
    } else {
      console.log("RUN yarn build")
      await execSync(`yarn build`)
    }
  }