import React, { PureComponent } from 'react'

import {
  ToolbarButton,
} from '@obsidians/ui-components'

import { networkManager } from '@obsidians/eth-network'
import redux from '@obsidians/redux'

export default class ConvertButton extends PureComponent {

  convert = () => {
    const chainId = networkManager.sdk.chainId
    const convertedAddress = networkManager.sdk.utils.convertAddress(this.props.address, chainId)

    const explorer = this.props.explorer

    try {
      explorer.tabs.current.navbar.current.onChange({ target: { value: convertedAddress } })
      explorer.tabs.current.updateTab({ value: convertedAddress })
      redux.dispatch('SELECT_ACCOUNT', { network: this.props.network, account: convertedAddress })
      explorer.onValue(convertedAddress)
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    if (!networkManager.sdk?.isValidAddress(this.props.address)) {
      return null
    }
    return (
      <ToolbarButton
        id='navbar-convert'
        size='md'
        icon='fas fa-repeat'
        tooltip='Convert'
        onClick={this.convert}
      />
    )
  }
}
