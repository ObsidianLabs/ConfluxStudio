import React, { PureComponent } from 'react'

import {
  FormGroup,
  Label,
  ButtonOptions,
  DropdownInput,
  Modal,
} from '@obsidians/ui-components'

import notification from '@obsidians/notification'
import { DockerImageInputSelector } from '@obsidians/docker'
import compilerManager from '@obsidians/compiler'
import os from 'os'
import './frameworkSelector.scss'

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
      teachInstallCommand: '',
    }
    this.confirmModal = React.createRef()
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
    compilerVersion = '0.0.0',
    projectRoot,
    terminal,
  }) => {
    if (framework === 'cfxtruffle') {
      // const grep = os.platform() === 'win32' ? 'findstr' : 'grep'
      // let hasGlobalTruffleAndRightVersion = false
      let checkCommand
      switch (npmClient) {
        case 'npm':
        case 'cnpm':
          checkCommand = `${npmClient} ls -g --depth=0`
          this.setState({
            teachInstallCommand: `${npmClient} i -g conflux-truffle`
          })
          break;
        case 'yarn':
          checkCommand = `${npmClient} global list --depth=0`
          this.setState({
            teachInstallCommand: `${npmClient} global add conflux-truffle`
          })
      }

      let hasGlobalTruffle = false
      while (true){
        const checkResult = await terminal.exec(checkCommand, { cwd: projectRoot })
        console.log(checkResult)
        let checkResultValue = checkResult.logs || ""
        checkResultValue = checkResultValue.toLowerCase()
        checkResultValue = checkResultValue.match(/conflux-truffle@[\d.]+/) ? checkResultValue.match(/conflux-truffle@[\d.]+/)[0] : ''
        if (checkResultValue.indexOf(`conflux-truffle@${compilerVersion}`) > -1) hasGlobalTruffle = false
        if (checkResultValue) return true
        const result = await new Promise(res => {
          this.onConfirm = () => {
            this.confirmModal.current.closeModal()
            res(true)
          }
          this.onClose = () => {
            this.confirmModal.current.closeModal()
            res(false)
          }
          this.confirmModal.current.openModal()
        })
        if (!result) return true
      }

      return false

      if (checkResultValue && checkResultValue.indexOf('conflux-truffle') > -1) {
        hasGlobalTruffle = true
        if (checkResultValue.indexOf(`conflux-truffle@${compilerVersion}`) > -1) {
          hasGlobalTruffleAndRightVersion = true
        }
      }

      if (hasGlobalTruffle && hasGlobalTruffleAndRightVersion) return true
      if (hasGlobalTruffle) {
        notification.error('Version Error', `The global installed truffle is not the correct version. need: ${compilerVersion}, current: ${checkResultValue}`)
        return false
      }

      await terminal.exec(`${npmClient} ${installCommand} conflux-truffle@${compilerVersion}`, { cwd: projectRoot })
      const result = await terminal.exec(`${npmClient} ${installCommand} conflux-truffle@${compilerVersion}`, { cwd: projectRoot })
      if (result.code) {
        notification.error('Fail to Install Conflux Truffle')
        return false
      }
    }
    return true
  }

  renderFrameworkVersions = () => {
    // hide chose
    const { framework } = this.props
    const { cfxtruffleVersion, cfxtruffleDockerVersion } = this.state
    if (framework === 'cfxtruffle') {
      return null
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

    return <>
      <Modal
        ref={this.confirmModal}
        title='Conflux Truffle Not Found'
        onConfirm={() => this.onConfirm()}
        textConfirm='OK'
        textCancel='Skip'
        onClosed={() => this.onClose()}
      >
      <p>Local Conflux Truffle installation not found. If you did not have Conflux Truffle installed yet, please proceed to terminal to install Conflux Truffle by running following command:</p>
      <code className='framework-selector-code'>{this.state.teachInstallCommand}</code>
      <p>If you have installed Conflux Truffle, press OK to proceed.</p>
      </Modal>
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
    </>
  }
}
