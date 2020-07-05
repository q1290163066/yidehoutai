import React, { Fragment } from 'react'
import Login from './pages/Login/Login'
import Index from './pages/Index/Index'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/index" component={Index} />
          <Redirect to={"/index"} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
