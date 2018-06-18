import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryString from "qs";
import get from "lodash/get";
import { getContestants } from "../actions/miscActions";

class UserProfile extends Component {
  render() {
    const { allUsers } = this.props;
    const parseUrl = queryString.parse(window.location.search, {
      ignoreQueryPrefix: true
    });

    return (
      <div style={{ margin: "20px" }}>
        {allUsers &&
          allUsers.map((contestant, key) => {
            if (contestant.username === parseUrl.username) {
              return (
                <div
                  key={key}
                  onClick={() => this.redirect(contestant.username)}
                >
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
                    {contestant.state}, {contestant.country}
                  </p>
                  <div>
                    {get(contestant, "contestantVideo.length") ? (
                      <iframe
                        width="100%"
                        height="300px"
                        src={contestant.contestantVideo[0]}
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
  getContestants: bindActionCreators(getContestants, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
