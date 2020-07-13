import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  ButtonGroup,
  Button,
  LoadingScreen,
} from '@obsidians/ui-components'

import Immutable from 'immutable'

import { connect } from '@obsidians/redux'
import { ProjectList, actions } from '@obsidians/project'

class UserHomepage extends PureComponent {
  static propTypes = {
    projects: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  renderCreateNewProjectButton = () => {
    return (
      <Button
        color='success'
        onClick={() => actions.newProject()}
      >
        <i className='fas fa-plus mr-1' />New
      </Button>
    )
  }

  renderOpenProjectButton = () => {
    return (
      <Button
        color='success'
        className='border-left-gray'
        onClick={() => actions.openProject()}
      >
        <i className='fas fa-folder-plus mr-1' />
        Open
      </Button>
    )
  }

  render () {
    const { projects } = this.props

    if (projects.get('loading')) {
      return <LoadingScreen />
    }

    return (
      <div className='d-flex w-100 h-100' style={{ overflow: 'auto' }}>
        <div className='container py-5'>
          <div className='d-flex flex-row justify-content-between'>
            <ButtonGroup className='my-3'>
              <h4 className='mb-0'>
                <i className='fas fa-th-list mr-2' />My Projects
              </h4>
            </ButtonGroup>
            <ButtonGroup className='my-3'>
              {this.renderCreateNewProjectButton()}
              {this.renderOpenProjectButton()}
            </ButtonGroup>
          </div>

          <ProjectList
            projects={this.props.projects.get('local').toJS()}
          />
        </div>
      </div>
    )
  }
}

export default connect(['projects'])(UserHomepage)
