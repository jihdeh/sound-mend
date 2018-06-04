import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import get from 'lodash/get'
import Loadable from 'react-loadable'
// -----STYLES------ //
import '../styles/home.css'

// ----END STYLES ----//

import NoMatch from './noMatch'

function AppLoader(props) {
  if (props.error) {
    return (
      <div
        style={{ textAlign: 'center', background: '#121212', height: '100vh' }}
      >
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.pastDelay) {
    return (
      <div
        style={{ textAlign: 'center', background: '#121212', height: '100vh' }}
      >
        Loading...
      </div>
    )
  } else {
    return null
  }
}

const Home = Loadable({
  loader: () => import('./home'),
  loading: AppLoader,
  delay: 200 // 0.2 seconds
})

const UserProfile = Loadable({
  loader: () => import('./userProfile'),
  loading: AppLoader,
  delay: 200 // 0.2 seconds
})

const Main = props => {
  return (
    <main className="main-container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={UserProfile} />
        <Route component={NoMatch} />
      </Switch>
    </main>
  )
}

export default Main
