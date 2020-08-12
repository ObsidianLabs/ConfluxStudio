import React, { Suspense, lazy } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import { LoadingScreen } from '@obsidians/ui-components'

const ReduxApp = lazy(() => import('./ReduxApp' /* webpackChunkName: "components" */))

export default function App () {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Route component={ReduxApp} />
      </Suspense>
    </HashRouter>
  )
}
