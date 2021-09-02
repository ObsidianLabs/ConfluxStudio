import React, { PureComponent } from 'react'

import {
  FormGroup,
  Label,
  ButtonOptions,
  DropdownInput,
} from '@obsidians/ui-components'

import notification from '@obsidians/notification'
import { DockerImageInputSelector } from '@obsidians/docker'
import compilerManager from '@obsidians/compiler'

const frameworkNames = {
  cfxtruffle: 'Conflux Truffle',
  'cfxtruffle-docker': `Dockerized ${process.env.COMPILER_NAME}`,
}

const cfxtruffleVersions = [
  { id: 'v1.0.2', display: 'v1.0.2' },
  { id: 'v1.0.1', display: 'v1.0.1' },
  { id: 'v1.0.0', display: 'v1.0.0' },
]

export default class FrameworkSelector extends PureComponent {
  static frameworkNames = frameworkNames
  
  constructor (props) {
    super(props)

    this.state = {
      cfxtruffleVersion: 'v1.0.2',
      cfxtruffleDockerVersion: '',
    }
  }

  getNameAndVersion = (framework, remote) => {
    if (remote) {
      return { name: '', version: '' }
    }
    const name = frameworkNames[framework]
    const version = framework === 'cfxtruffle-docker'
      ? this.state.cfxtruffleDockerVersion
      : this.state[`${framework}Version`]
    return { name, version }
  }

  installDependencies = async ({
    framework,
    npmClient,
    installCommand,
    compilerVersion,
    projectRoot,
    terminal,
  }) => {
    if (framework === 'cfxtruffle') {
      const result = await terminal.exec(`${npmClient} ${installCommand} conflux-truffle@${compilerVersion}`, { cwd: projectRoot })
      if (result.code) {
        notification.error('Fail to Install Conflux Truffle')
        return false
      }
    }
    return true
  }

  renderFrameworkVersions = () => {
    const { framework } = this.props
    const { cfxtruffleVersion, cfxtruffleDockerVersion } = this.state
    if (framework === 'cfxtruffle') {
      return (
        <FormGroup className='mb-2'>
          <Label>Conflux truffle version</Label>
          <DropdownInput
            size='sm'
            options={cfxtruffleVersions}
            value={cfxtruffleVersion}
            onChange={cfxtruffleVersion => this.setState({ cfxtruffleVersion })}
          />
        </FormGroup>
      )
    } else if (framework === 'cfxtruffle-docker') {
      return (
        <FormGroup className='mb-2'>
          <Label>{`${process.env.COMPILER_NAME_IN_LABEL} version`}</Label>
          <DockerImageInputSelector
            size='sm'
            key='cfxtruffle-selector'
            label=''
            channel={compilerManager.truffle}
            noneName={`${process.env.COMPILER_NAME}`}
            modalTitle={`${process.env.COMPILER_NAME} Manager`}
            downloadingTitle={`Downloading ${process.env.COMPILER_NAME}`}
            selected={cfxtruffleDockerVersion}
            onSelected={cfxtruffleDockerVersion => this.setState({ cfxtruffleDockerVersion })}
          />
        </FormGroup>
      )
    }
    return null
  }
 
  render () {
    const { framework, group, onSelectFramework } = this.props

    const options = [{ key: 'cfxtruffle-docker', text: frameworkNames['cfxtruffle-docker'] }]
    if (group !== process.env.COMPILER_NAME) {
      options.unshift({ key: 'cfxtruffle', text: frameworkNames.cfxtruffle })
    }

    return (
      <div className='row'>
        <div className='col-12 col-sm-7'>
          <FormGroup>
            <Label>Framework</Label>
            <div>
              <ButtonOptions
                size='sm'
                className='mb-0'
                options={options}
                selected={framework}
                onSelect={onSelectFramework}
              />
            </div>
          </FormGroup>
        </div>
        <div className='col-12 col-sm-5'>
          {this.renderFrameworkVersions()}
        </div>
      </div>
    )
  }
}
