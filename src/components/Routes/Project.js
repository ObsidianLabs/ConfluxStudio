import React, { PureComponent } from 'react'

import platform from '@obsidians/platform'
import { connect } from '@obsidians/redux'
import Project from '@obsidians/project'

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

  render () {
    const { projects, match } = this.props
    const { username, project } = match.params

    let type, projectRoot, selected
    if (username === 'local') {
      type = 'Local'
      selected = projects.get('selected')?.toJS() || {}
      projectRoot = selected.path
    } else {
      type = 'Remote'
      projectRoot = `${username}/${project}`
    }

    if (type === 'Local' && platform.isWeb) {
      return null
    }
    
    return (
      <Project
        theme='obsidians'
        projectRoot={projectRoot}
        type={type}
      />
    )
  }
}

export default connect(['projects'])(ProjectWithProps)
