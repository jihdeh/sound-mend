import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'
import { getContestants } from '../actions/miscActions'
import { updateProfile } from '../actions/profileActions'
import '../styles/home.css'

class Home extends Component {
  redirect(username) {
    this.props.history.push(`/profile?username=${username}`)
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.profile, nextProps.profile)
    if (
      this.props.profile.profileUpdated !== nextProps.profile.profileUpdated
    ) {
      // this.setState({
      //   hasUpdated: true
      // });
      // window.location.reload()
    }
  }

  qualifiedFunc({ qualified, username }) {
    return qualified ? (
      <p>Qualified</p>
    ) : (
      <button
        onClick={() => this.onUpdateQualification(username)}
        type="button"
        className="btn btn-secondary"
      >
        Qualify
      </button>
    )
  }

  onUpdateQualification(username) {
    this.props.updateProfile({
      isQualified: true,
      username
    })
  }

  render() {
    const { allUsers } = this.props

    return (
      <div className="container-fluid">
        <div>
          <h3>Total count {get(allUsers, 'length')}</h3>
          <input type="text" />
        </div>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Qualified</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Votes Attained</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((contestant, key) => (
                <tr
                  key={key}
                  className={
                    !contestant.qualified ? 'table-danger cursor' : 'cursor'
                  }
                >
                  <td>{this.qualifiedFunc(contestant)}</td>
                  <td>
                    {contestant.profilePhoto ? (
                      <img
                        src={contestant.profilePhoto}
                        className="image_portrait"
                      />
                    ) : (
                      'None'
                    )}
                  </td>
                  <td onClick={() => this.redirect(contestant.username)}>
                    {contestant.firstName} {contestant.lastName}
                  </td>
                  <td>{contestant.numberOfVotesAttained}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ misc, error, profile }) => ({
  allUsers: misc.searchResults,
  errorMessage: error,
  profile: profile
})

const mapDispatchToProps = dispatch => ({
  getContestants: bindActionCreators(getContestants, dispatch),
  updateProfile: bindActionCreators(updateProfile, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
