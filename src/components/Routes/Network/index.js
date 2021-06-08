import Network, { RemoteNetwork, CustomNetwork } from '@obsidians/network'
import nodeManager from '@obsidians/node'

import RemoteNetworkInfo from './RemoteNetworkInfo'

nodeManager.generateCommand = ({ name, version }) => {
  const containerName = `${process.env.PROJECT}-${name}-${version}`

  return [
    'docker run -it --rm',
    `--name ${containerName}`,
    `-p 12535:12535`,
    `-p 12536:12536`,
    `-p 12537:12537`,
    `-v ${process.env.PROJECT}-${name}:/${process.env.PROJECT}-node`,
    `-w /${process.env.PROJECT}-node`,
    `--entrypoint conflux`,
    `${process.env.DOCKER_IMAGE_NODE}:${version}`,
    `--config default.toml`
  ].join(' ')
}

RemoteNetwork.defaultProps = { RemoteNetworkInfo }
CustomNetwork.defaultProps = { placeholder: 'e.g. http://127.0.0.1:12537' }

Network.defaultProps = {
  configButton: true,
  minerKey: true,
}

export default Network
