import platform from '@obsidians/platform'
import Network, { RemoteNetwork, CustomNetwork } from '@obsidians/network'
import nodeManager from '@obsidians/node'

import RemoteNetworkInfo from './RemoteNetworkInfo'

let dockerImageForNode = process.env.DOCKER_IMAGE_NODE
// if (platform.isAppleSilicon) {
//   dockerImageForNode += '-arm64'
// }

nodeManager.generateCommand = ({ name, version }) => {
  const containerName = `${process.env.PROJECT}-${name}-${version}`

  let configFile = 'default.toml'

  if (version.startsWith('2.')) { 
    configFile = 'conflux.toml'
  }

  return [
    `docker run -it --rm`,
    `--name ${containerName}`,
    `-p 12535:12535`,
    `-p 12536:12536`,
    `-p 12537:12537`,
    `-v ${process.env.PROJECT}-${name}:/${process.env.PROJECT}-node`,
    `-w /${process.env.PROJECT}-node`,
    `--entrypoint conflux`,
    `${dockerImageForNode}:${version}`,
    `--config ${configFile}`,
  ].join(' ')
}

RemoteNetwork.defaultProps = { RemoteNetworkInfo }
CustomNetwork.defaultProps = { placeholder: 'e.g. http://127.0.0.1:12537' }

Network.defaultProps = {
  configButton: true,
  minerKey: true,
}

export default Network
