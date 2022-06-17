import React, { Suspense, lazy, PureComponent } from 'react'
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import platform from '@obsidians/platform'
import { LoadingScreen } from '@obsidians/ui-components'
import Auth from '@obsidians/auth'

const Router = platform.isDesktop ? HashRouter : BrowserRouter
const ReduxApp = lazy(() => import('./ReduxApp' /* webpackChunkName: "components" */))

export default class App extends PureComponent{
  static getDerivedStateFromError(error){
    console.log(error)
    return {
      hasError: true,
      error,
    }
  }
  render(){
    if (this?.state?.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      let error = '该错误暂无错误信息'
      if (this?.state?.error){
        const originError = this?.state?.error
        error = originError.stack || originError.message || originError?.toString()
      }
      return (<>
      <div style={{
      fontSize: '2rem',
      padding: '1rem 2rem',
      }}>Conflux Studio 出现了一些错误
      </div>
      <div style={{
      fontSize: '1rem',
      padding: '0 2rem 1rem',
      }}>你可以尝试同时按下 Ctrl 与 R 键（在 Windows 和 Linux 平台上），或同时按下 Command 与 R 键（在 Mac 平台上）来刷新页面重试。
      </div>
      <div style={{
        fontSize: '1rem',
        padding: '0 2rem 1rem',
        }}>如果错误反复出现，可以尝试在备份必要的数据（如密钥）之后，使用 Application 菜单中的 Clear All App Data 功能清除所有数据，然后重启本应用。
      </div>
      <div style={{
        fontSize: '1rem',
        padding: '0 2rem 1rem',
        }}>你也可以将以下信息发送给我们，帮助我们解决此问题。
      </div>
      <div style={{
        fontSize: '1rem',
        padding: '0 2rem 1rem',
        whiteSpace: 'pre-wrap',
        color: 'rgba(233, 244, 255, .5)',
        }}>
        {error}
        </div>

      </>)
    }
    return(
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route path='/callback' render={props => {
            Auth.callback(props)
            return <LoadingScreen text='Logging in...' />
          }}/>
          <Route component={ReduxApp} />
        </Switch>
      </Suspense>
    </Router>
  )
  }
}
