import React, { PureComponent } from 'react'

import {
  Button,
} from '@obsidians/ui-components'

import { connect } from '@obsidians/redux'
import Project, { actions } from '@obsidians/project'

window.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.js';
    }
    if (label === 'css') {
      return './css.worker.js';
    }
    if (label === 'html') {
      return './html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    return './editor.worker.js';
  }
}

class ProjectWithProps extends PureComponent {
  async componentDidMount () {
    this.props.cacheLifecycles.didRecover(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }

  renderInvalidProjectActions = project => {
    return (
      <React.Fragment>
        <Button
          color='secondary'
          onClick={() => actions.removeProject(project)}
        >Remove</Button>
      </React.Fragment>
    )
  }

  render () {
    const { projects, globalConfig } = this.props
    const selected = projects.get('selected')?.toJS() || {}
    
    return (
      <Project
        theme='obsidians'
        projectRoot={selected.path}
        solc={globalConfig.get('solc')}
        compilerVersion={globalConfig.get('compilerVersion')}
        InvalidProjectActions={this.renderInvalidProjectActions(selected)}
      />
    )
  }
}

export default connect([
  'projects',
  'globalConfig',
])(ProjectWithProps)
