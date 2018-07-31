import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import queryString from 'qs'
import get from 'lodash/get'
import { getContestants } from '../actions/miscActions'
import { updateProfile } from '../actions/profileActions'

class UserProfile extends Component {
  state = {
    qualifiedVideoUrl: null,
    hasUpdated: false
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.profile, nextProps.profile)
    if (
      this.props.profile.profileUpdated !== nextProps.profile.profileUpdated
    ) {
      // this.setState({
      //   hasUpdated: true
      // });
      window.location.reload()
    }
  }

  onUpdateQualification(qualifiedVideoUrl, username) {
    this.props.updateProfile({
      qualifiedVideoUrl,
      isQualified: true,
      username
    })
  }

  render() {
    const { allUsers } = this.props
    const { hasUpdated, qualifiedVideoUrl } = this.state
    const parseUrl = queryString.parse(window.location.search, {
      ignoreQueryPrefix: true
    })

    return (
      <div style={{ margin: '20px' }}>
        {allUsers &&
          allUsers.map((contestant, key) => {
            if (contestant.username === parseUrl.username) {
              return (
                <div key={key}>
                  <p>
                    Fullname: {contestant.firstName} {contestant.lastName}
                  </p>
                  <p>Username: {contestant.username}</p>
                  <p>Phone: {contestant.phoneNumber}</p>
                  <p>Email: {contestant.email}</p>
                  <p>
                    State: {contestant.state}, Country: {contestant.country}
                  </p>
                  <p>Qualified?: {contestant.qualified ? 'Yes' : 'No'}</p>
                  {/*!contestant.qualified && (
                    <div>
                      <p>
                        EDIT THE LINKS TO LOOK LIKE THIS
                        https://www.youtube.com/embed/WbHYraTWEOA, where the
                        "-AU2is92i0" IS THE KEY TO THE VIDEO
                      </p>
                      <label htmlFor="qualified">
                        Enter qualified candidates new video
                      </label>
                      <div>
                        <input
                          type="text"
                          id="qualified"
                          className="form-control"
                          style={{ height: '30px', width: '150px' }}
                          placeholder="Enter youtube url"
                          onChange={({ target }) =>
                            this.setState({
                              qualifiedVideoUrl: target.value
                            })
                          }
                        />
                        <button
                          onClick={() =>
                            this.onUpdateQualification(
                              qualifiedVideoUrl,
                              contestant.username
                            )
                          }
                        >
                          SUBMIT VIDEO
                        </button>
                      </div>
                      <p>{hasUpdated}</p>
                    </div>
                  )}
                  <div>
                    {get(contestant, 'qualifiedVideo.length') ? (
                      <iframe
                        width="100%"
                        height="300px"
                        src={contestant.qualifiedVideo[0]}
                        title="Contestant video 2"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      <p>This user has no video</p>
                    )}
                  </div>*/}
                </div>
              )
            }
          })}
      </div>
    )
  }
}

const mapStateToProps = ({ misc, profile }) => ({
  allUsers: misc.searchResults,
  profile: profile
})

const mapDispatchToProps = dispatch => ({
  getContestants: bindActionCreators(getContestants, dispatch),
  updateProfile: bindActionCreators(updateProfile, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
