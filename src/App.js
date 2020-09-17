import React, { Suspense, lazy } from 'react'
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'

import { LoadingScreen } from '@obsidians/ui-components'

const Router = window.require ? HashRouter : BrowserRouter
const ReduxApp = lazy(() => import('./ReduxApp' /* webpackChunkName: "components" */))

export default function App () {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Route component={ReduxApp} />
      </Suspense>
    </Router>
  )
}
