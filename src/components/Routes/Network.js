import React, { PureComponent } from 'react'

import redux, { connect } from '@obsidians/redux'
import { InstanceList } from '@obsidians/instances'

import { withRouter } from 'react-router-dom'

const onLifecycle = ({ lifecycle, runningInstance, algoNode }) => {
  switch (lifecycle) {
    case 'stopped':
      redux.dispatch('UPDATE_UI_STATE', { localNetwork: '', algoNode: '' })
      break
    case 'started':
      redux.dispatch('UPDATE_UI_STATE', { localNetwork: runningInstance, algoNode })
      break
    default:
  }
}

class Network extends PureComponent {
  state = {
    active: true
  }

  componentDidMount () {
    this.props.cacheLifecycles.didCache(() => this.setState({ active: false }))
    this.props.cacheLifecycles.didRecover(() => this.setState({ active: true }))
  }

  render () {
    return (
      <InstanceList
        network={this.props.network}
        onLifecycle={onLifecycle}
        active={this.state.active}
      />
    )
  }
}


export default connect([
  'network',
])(withRouter(Network))
