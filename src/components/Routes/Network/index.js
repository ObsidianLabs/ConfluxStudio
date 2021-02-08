import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from '@obsidians/redux'
import Network from '@obsidians/network'
import nodeManager from '@obsidians/node'

import RemoteNetwork from './RemoteNetwork'

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

class NetworkWithProps extends PureComponent {
  state = {
    active: true
  }

  componentDidMount () {
    this.props.cacheLifecycles.didCache(() => this.setState({ active: false }))
    this.props.cacheLifecycles.didRecover(() => this.setState({ active: true }))
  }

  render () {
    return (
      <Network
        configButton
        minerKey
        // minerTerminal
        networkId={this.props.network}
        active={this.state.active}
        RemoteNetwork={RemoteNetwork}
      />
    )
  }
}


export default connect([
  'network',
])(withRouter(NetworkWithProps))
