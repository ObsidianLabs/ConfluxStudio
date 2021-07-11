const os = require('os')
const { IpcChannel } = require('@obsidians/ipc')
const KeypairManager = require('@obsidians/keypair')
const { AutoUpdate } = require('@obsidians/global')
const CompilerManager = require('@obsidians/eth-compiler')
const { InstanceManager } = require('@obsidians/conflux-network')
const ProjectChannel = require('@obsidians/conflux-project')
const AuthChannel = require('@obsidians/auth')

const isAppleSilicon = Boolean(os.cpus().find(cpu => cpu.model.startsWith('Apple M')))
let dockerImageForNode = process.env.DOCKER_IMAGE_NODE
if (isAppleSilicon) {
  dockerImageForNode += '-arm64'
}

let ipcChannel, keypairManager, autoUpdate, compilerManager, instanceManager, projectChannel, authChannel
module.exports = function () {
  ipcChannel = new IpcChannel()
  keypairManager = new KeypairManager(process.env.PROJECT)
  autoUpdate = new AutoUpdate('https://app.obsidians.io/api/v1/check-update/conflux/')
  compilerManager = new CompilerManager()
  instanceManager = new InstanceManager(dockerImageForNode)
  projectChannel = new ProjectChannel()
  authChannel = new AuthChannel()
}
