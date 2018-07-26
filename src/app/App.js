import React from 'react'
import {hot} from 'react-hot-loader'
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {configureStore} from './store'
import {Home} from './screens/Home'


const store = configureStore({})

const App = () =>
  <Router>
    <Provider store={store}>
      <div>
        <Switch>
          <Route path='/index' component={Home}/>
          <Route path='/' render={() => <Redirect to='/index'/>}/>
        </Switch>
      </div>
    </Provider>
  </Router>

export const Root = hot(module)(() => <App/>)
