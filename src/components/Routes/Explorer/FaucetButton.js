import React, { PureComponent } from 'react'

import {
  ToolbarButton,
} from '@obsidians/ui-components'

import notification from '@obsidians/notification'

import { networkManager } from '@obsidians/eth-network'

import Faucet from './Faucet.json'

export default class FaucetButton extends PureComponent {
  claim = async () => {
    if (this.props.network !== 'testnet') {
      return
    }

    let gasPrice = "1"
    if(networkManager?.sdk?.client) {
      gasPrice = await networkManager.sdk.client.callRpc('cfx_gasPrice', [])
    }

    const faucetContract = networkManager.sdk.contractFrom({
      address: 'cfxtest:acejjfa80vj06j2jgtz9pngkv423fhkuxj786kjr61',
      abi: Faucet,
    })
    const base32Address = networkManager.sdk.utils.format.base32Address(this.props.address)

    this.notification = notification.info(`Claiming ${networkManager.symbol} & cUSDT...`, `Trying to claim ${networkManager.symbol} and cUSDT for <b>${this.props.address}</b>`, 0)
    
    const account = await networkManager.sdk.client.cfx.getAccount(base32Address)
    let nonce = Number(account.nonce.toString())
    let tx1 = faucetContract.execute('claimCfx', { array: [] }, { from: base32Address, value: '0' })
    try {
      const override1 = await networkManager.sdk.estimate(tx1)
      override1.gasPrice = gasPrice
      tx1 = faucetContract.execute('claimCfx', { array: [] }, { ...override1, nonce: nonce, from: base32Address, value: '0' })
      const pendingTx1 = networkManager.sdk.sendTransaction(tx1)
      await pendingTx1.mined()
    } catch (e) {
      this.notification.dismiss()
      notification.error('Claim Token Failed', e.message)
      return
    }

    let tx2 = faucetContract.execute('claimToken', { array: ['cfxtest:acepe88unk7fvs18436178up33hb4zkuf62a9dk1gv'] }, { from: base32Address, value: '0' })
    try {
      const override2 = await networkManager.sdk.estimate(tx2)
      override2.gasPrice = gasPrice
      tx2 = faucetContract.execute('claimToken', {
        array: ['cfxtest:acepe88unk7fvs18436178up33hb4zkuf62a9dk1gv']
      }, { ...override2, nonce: nonce + 1, from: base32Address, value: '0' })
      const pendingTx2 = networkManager.sdk.sendTransaction(tx2)
      await pendingTx2.mined()
    } catch (e) {
      this.notification.dismiss()
      notification.error('Claim Token Failed', e.message)
      return
    }

    this.notification.dismiss()
    notification.success(`${networkManager.symbol} Claimed`, `Claimed 1,000 ${networkManager.symbol} and 1,000 cUSDT for <b>${this.props.address}</b>`)
    this.props.explorer.currentPage?.refresh()
  }

  render () {
    if (this.props.network !== 'testnet') {
      return null
    }
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
