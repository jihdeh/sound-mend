import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getContestants } from '../actions/miscActions';

class Home extends Component {
  redirect(username) {
    console.log(this.props);
    this.props.history.push(`/profile?username=${username}`);
  }
  render() {
    const { allUsers } = this.props;

    return (
      <div>
        <ol>
          {allUsers &&
            allUsers.map((contestant, key) => {
              return (
                <li
                  style={{ cursor: 'pointer' }}
                  key={key}
                  onClick={() => this.redirect(contestant.username)}
                >
                  <p>
                    {contestant.firstName} {contestant.lastName}{' '}
                    {contestant.numberOfVotesAttained}
                  </p>
                </li>
              );
            })}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allUsers: state.misc.searchResults,
  errorMessage: state.error
});

const mapDispatchToProps = dispatch => ({
  getContestants: bindActionCreators(getContestants, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
