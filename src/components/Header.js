import React, { PureComponent } from 'react'

import { connect } from '@obsidians/redux'

import platform from '@obsidians/platform'
import headerActions, { Header, NavGuard } from '@obsidians/header'
import { networkManager } from '@obsidians/network'
import { actions } from '@obsidians/workspace'

import { List } from 'immutable'

const networkList = [
  {
    id: 'testnet',
    group: 'testnet',
    name: 'Testnet',
    fullName: 'PlatON Testnet',
    icon: 'fas fa-vial',
    notification: 'Switched to <b>PlatON Testnet</b> network.',
    url: 'https://test.confluxrpc.org',
    chainId: 1,
    explorer: 'https://testnet.confluxscan.io/v1',
  },
  {
    id: 'tethys',
    group: 'mainnet',
    name: 'Tethys',
    fullName: 'PlatON Tethys',
    icon: 'fas fa-globe',
    notification: 'Switched to <b>PlatON Tethys</b> network.',
    url: 'https://main.confluxrpc.org',
    chainId: 1029,
    explorer: 'https://confluxscan.io/v1',
  }
]
if (platform.isDesktop) {
  networkList.unshift({
    id: 'dev',
    group: 'default',
    name: 'Development',
    fullName: 'Development Network',
    icon: 'fas fa-laptop-code',
    notification: 'Switched to <b>Development</b> network.',
    url: 'http://localhost:12537',
    chainId: 0,
  })
}
const networks = List(networkList)

class HeaderWithRedux extends PureComponent {
  componentDidMount () {
    actions.history = this.props.history
    headerActions.history = this.props.history
    if (!networkManager.network) {
      networkManager.setNetwork(networks.get(0))
    }
    this.navGuard = new NavGuard(this.props.history)
  }

  networkList = networksByGroup => {
    const networkList = []
    const groups = networksByGroup.toJS()
    const keys = Object.keys(groups)
    keys.forEach((key, index) => {
      if (key !== 'default') {
        networkList.push({ header: key })
      }
      const networkGroup = groups[key].sort((b, a) => b.name < a.name ? -1 : 1)
      networkGroup.forEach(network => networkList.push(network))
      if (index !== keys.length - 1) {
        networkList.push({ divider: true })
      }
    })
    return networkList
  }

  render () {
    console.debug('[render] HeaderWithRedux')
    const { profile, projects, contracts, accounts, network } = this.props

    const selectedProject = projects.get('selected')?.toJS() || {}

    const networkGroups = networks.groupBy(n => n.group)
    const networkList = this.networkList(networkGroups)
    const selectedNetwork = networks.find(n => n.id === network) || {}

    const starred = accounts.getIn([network, 'accounts'])?.toJS() || []
    const selectedContract = contracts.getIn([network, 'selected']) || ''
    const selectedAccount = accounts.getIn([network, 'selected']) || ''

    return (
      <Header
        profile={profile}
        projects={projects.get('local').toJS()}
        selectedProject={selectedProject}
        selectedContract={selectedContract}
        selectedAccount={selectedAccount}
        starred={starred}
        network={selectedNetwork}
        networkList={networkList}
      />
    )
  }
}

export default connect([
  'profile',
  'projects',
  'contracts',
  'accounts',
  'network',
])(HeaderWithRedux)
