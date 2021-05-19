import React from 'react'

import { connect } from '@obsidians/redux'
import BottomBar from '@obsidians/bottombar'

function BottomBarWithProps ({ network, queue, uiState }) {
  const localNetwork = uiState.get('localNetwork')
  let txs
  if (network !== 'dev') {
    txs = queue.getIn([network, 'txs'])
  } else if (localNetwork && localNetwork.lifecycle === 'started') {
    txs = queue.getIn([localNetwork.params.id, 'txs'])
  }
  return (
    <BottomBar
      chains={[
        { key: 'dev', text: 'Local develop networks', filter: key => key.startsWith('0x') },
        { key: 'testnet', text: 'Testnet', filter: key => key.startsWith('cfxtest:') },
        { key: 'mainnet', text: 'Tethys mainnet', filter: key => key.startsWith('cfx:'), network: 'tethys' }
      ]}
      txs={txs}
    />
  )
}

export default connect(['queue', 'network', 'uiState'])(BottomBarWithProps)
