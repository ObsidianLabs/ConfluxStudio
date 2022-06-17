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
      }}>Conflux Studio encountered some errors
      </div>
      <div style={{
      fontSize: '1rem',
      padding: '0 2rem 1rem',
      }}>Press Ctrl + R ( Windows / Linux ) or Command + R ( macOS ) to refresh this page.
      </div>
      <div style={{
        fontSize: '1rem',
        padding: '0 2rem 1rem',
        }}>If error persists, back up necessary data ( i.e. keypairs ), click Application - Clear All App Data and restart the application.
      </div>
      <div style={{
        fontSize: '1rem',
        padding: '0 2rem 1rem',
        }}>Submit a Github Issue with below error logs to help us find the root cause.
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
