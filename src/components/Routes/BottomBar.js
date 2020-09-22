import React from 'react'

import redux, { connect } from '@obsidians/redux'
import BottomBar from '@obsidians/bottombar'

function BottomBarWithProps (props) {
  return (
    <BottomBar
      txs={props.queue.getIn([props.network, 'txs'])}
      solc={props.globalConfig.get('solc')}
      onSelectSolc={solc => redux.dispatch('UPDATE_GLOBAL_CONFIG', { solc })}
      compilerVersion={props.globalConfig.get('compilerVersion')}
      onSelectCompiler={compilerVersion => redux.dispatch('UPDATE_GLOBAL_CONFIG', { compilerVersion })}
    />
  )
}

export default connect(['projects', 'globalConfig', 'queue', 'network'])(BottomBarWithProps)
