import React from 'react'

import redux, { connect } from '@obsidians/redux'
import BottomBar from '@obsidians/bottombar'

function BottomBarWithProps (props) {
  const selected = props.projects.get('selected')

  return (
    <BottomBar
      nodeVersion={props.globalConfig.get('nodeVersion')}
      compilerVersion={props.globalConfig.get('compilerVersion')}
      onSelectNodeVersion={nodeVersion => redux.dispatch('UPDATE_GLOBAL_CONFIG', { nodeVersion })}
      onSelectCompiler={compilerVersion => redux.dispatch('UPDATE_GLOBAL_CONFIG', { compilerVersion })}
    />
  )
}

export default connect(['projects', 'globalConfig'])(BottomBarWithProps)
