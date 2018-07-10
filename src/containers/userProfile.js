import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'qs';
import get from 'lodash/get';
import { getContestants } from '../actions/miscActions';
import { updateProfile } from '../actions/profileActions';

class UserProfile extends Component {
  onUpdateQualification(isQualified, username) {
    this.props.updateProfile({ isQualified, username });
  }

  render() {
    const { allUsers } = this.props;
    const parseUrl = queryString.parse(window.location.search, {
      ignoreQueryPrefix: true
    });

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
                  {contestant.profilePhoto ? (
                    <img
                      width="300px"
                      height="auto"
                      src={contestant.profilePhoto}
                    />
                  ) : (
                    <p>No profile photo</p>
                  )}
                  <p>Username: {contestant.username}</p>
                  <p>Phone: {contestant.phoneNumber}</p>
                  <p>Email: {contestant.email}</p>
                  <p>
                    State: {contestant.state}, Country: {contestant.country}
                  </p>
                  <p>Number of votes {contestant.numberOfVotesAttained}</p>
                  <div>
                    {contestant.qualified === true ? (
                      <p>Qualified?: Yes</p>
                    ) : (
                      <span>
                        <button
                          onClick={() =>
                            this.onUpdateQualification(
                              true,
                              contestant.username
                            )
                          }
                        >
                          HasQualified?
                        </button>
                        <p>Click this button once then refresh</p>
                      </span>
                    )}
                  </div>
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
                  </div>
                </div>
              );
            }
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allUsers: state.misc.searchResults
});

const mapDispatchToProps = dispatch => ({
  getContestants: bindActionCreators(getContestants, dispatch),
  updateProfile: bindActionCreators(updateProfile, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
