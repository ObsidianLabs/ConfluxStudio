import React, { Component, Suspense, lazy } from 'react'

import platform from '@obsidians/platform'
import fileOps from '@obsidians/file-ops'
import Auth from '@obsidians/auth'
import { NotificationSystem } from '@obsidians/notification'
import Welcome, { checkDependencies } from '@obsidians/welcome'
import { GlobalModals, autoUpdater } from '@obsidians/global'
import { LoadingScreen } from '@obsidians/ui-components'
import redux, { Provider } from '@obsidians/redux'
import { instanceChannel } from '@obsidians/network'
import { DockerImageChannel } from '@obsidians/docker'
import semver from 'semver'

import { config, updateStore } from '@/redux'
import '@/menu'

import Routes from './components/Routes'
import icon from './components/icon.png'
const Header = lazy(() => import('./components/Header' /* webpackChunkName: "components" */))

let dockerImageForNode = process.env.DOCKER_IMAGE_NODE
if (platform.isAppleSilicon) {
  dockerImageForNode += '-arm64'
}
instanceChannel.node = new DockerImageChannel(dockerImageForNode, {
  filter: v => semver.valid(v) && semver.gte(v, '1.0.0') && v.indexOf('testnet') === -1 && v.indexOf('mainnet') === -1
})

export default class ReduxApp extends Component {
  state = {
    loaded: false,
    dependencies: false
  }

  async componentDidMount () {
    await redux.init(config, updateStore).then(onReduxLoaded)
    this.refresh()
  }

  refresh = async () => {
    const dependencies = await checkDependencies()
    this.setState({ loaded: true, dependencies })
    autoUpdater.check()
  }

  skip = () => {
    this.setState({ loaded: true, dependencies: true })
  }

  render () {
    if (!this.state.loaded) {
      return <LoadingScreen />
    }

    if (!this.state.dependencies) {
      return (
        <Suspense fallback={<LoadingScreen />}>
          <Welcome isReady={checkDependencies} onGetStarted={this.skip} />
          <NotificationSystem />
          <GlobalModals icon={icon} />
        </Suspense>
      )
    }

    return (
      <Provider store={redux.store}>
        <div
          className='body'
          style={{ paddingTop: this.state.dependencies ? '49px' : '0' }}
        >
          <Routes>
            <Header history={this.props.history} />
            <NotificationSystem />
            <GlobalModals icon={icon} />
          </Routes>
        </div>
      </Provider>
    )
  }
}

async function onReduxLoaded () {
  Auth.restore()
  const version = await fileOps.current.getAppVersion()
  redux.dispatch('SET_VERSION', { version })
}
