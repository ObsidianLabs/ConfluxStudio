const os = require('os')
const { IpcChannel } = require('@obsidians/ipc')
const KeypairManager = require('@obsidians/keypair')
const FileOpsChannel = require('@obsidians/file-ops')
const { AutoUpdate } = require('@obsidians/global')
const CompilerManager = require('@obsidians/eth-compiler')
const { InstanceManager } = require('@obsidians/conflux-network')
const ProjectChannel = require('@obsidians/conflux-project')
const { SdkChannel } = require('@obsidians/conflux-sdk')
const AuthChannel = require('@obsidians/auth')

const isAppleSilicon = Boolean(os.cpus().find(cpu => cpu.model.startsWith('Apple M')))
let dockerImageForNode = process.env.DOCKER_IMAGE_NODE
if (isAppleSilicon) {
  dockerImageForNode += '-arm64'
}

let ipcChannel, keypairManager, fileOpsChannel, autoUpdate, compilerManager, instanceManager, projectChannel, sdkChannel, authChannel
module.exports = function () {
  ipcChannel = new IpcChannel()
  fileOpsChannel = new FileOpsChannel()
  keypairManager = new KeypairManager(process.env.PROJECT)
  autoUpdate = new AutoUpdate('https://app.obsidians.io/api/v1/check-update/conflux/')
  compilerManager = new CompilerManager()
  instanceManager = new InstanceManager(dockerImageForNode)
  projectChannel = new ProjectChannel()
  sdkChannel = new SdkChannel(keypairManager)
  authChannel = new AuthChannel()
}
