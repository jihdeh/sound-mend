import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import Main from './containers/main'
import { getContestants } from './actions/miscActions'
import './App.css'

class App extends Component {
  componentWillMount() {
    this.props.getContestants()
  }

  onClose() {
    this.props.clearError()
  }

  render() {
    const { errorMessage } = this.props
    return (
      <div>
        <Main />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allUsers: state.misc.searchResults,
  errorMessage: state.error
})

const mapDispatchToProps = dispatch => ({
  getContestants: bindActionCreators(getContestants, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
