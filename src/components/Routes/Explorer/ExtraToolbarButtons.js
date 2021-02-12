import React, { PureComponent } from 'react'

import {
  ToolbarButton,
} from '@obsidians/ui-components'

import notification from '@obsidians/notification'

// export default class FaucetButton extends PureComponent {

//   convert = () => {
//     const convertedAddress = networkManager.sdk.convertAddress(this.props.address)

//     const explorer = this.props.explorer

//     // explorer.tabs?.current?.navbar?.current?.onChange({ target: { value: convertedAddress } })
//     // explorer.tabs?.current?.updateTab({ value: convertedAddress })
//     explorer.onValue(convertedAddress)
//   }

//   render () {
//     if (!networkManager.sdk?.isValidAddress(this.props.address)) {
//       return null
//     }
//     return (
//       <ToolbarButton
//         id='navbar-convert'
//         size='md'
//         icon='fas fa-repeat'
//         tooltip='Convert'
//         onClick={this.convert}
//       />
//     )
//   }
// }

export default class FaucetButton extends PureComponent {
  claim = async () => {
    let faucetUrl
    if (this.props.network === 'testnet') {
      faucetUrl = `http://test-faucet.conflux-chain.org:18088/dev/ask?address=${this.props.address?.toLowerCase()}`
    } else {
      return
    }

    this.notification = notification.info(`Claiming ${process.env.TOKEN_SYMBOL}...`, `Trying to claim ${process.env.TOKEN_SYMBOL} tokens for <b>${this.props.address}</b>`, 0)
    let result
    try {
      const res = await fetch(faucetUrl)
      result = await res.json()
    } catch (e) {}
    this.notification.dismiss()
    if (!result) {
      notification.error('Failed', 'Unknown error')
      return
    }
    if (result.code) {
      notification.error('Failed', result.message)
    } else {
      notification.success(`${process.env.TOKEN_SYMBOL} Claimed`, `Claimed 100 ${process.env.TOKEN_SYMBOL} for <b>${this.props.address}</b>`)
    }
  }

  render () {
    return (
      <ToolbarButton
        id='navbar-cfx-faucet'
        size='md'
        icon='fas fa-faucet'
        tooltip='Faucet'
        onClick={this.claim}
      />
    )
  }
}
