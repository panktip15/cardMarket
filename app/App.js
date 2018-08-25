import React from 'react'
import {hot} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {configureStore} from './store'
import {Home} from './screens/Home'
import EthProvider from './contexts/EthProvider'


const store = configureStore({})

const App = () =>
  <EthProvider>
    <Provider store={store}>
      <Home />
    </Provider>
  </EthProvider>

export const Root = hot(module)(App)
