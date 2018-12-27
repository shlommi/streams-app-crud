import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "659897348045-a1185nl753iki0mqahtu4ctgpbj4n7j4.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.handleAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.handleAuthChange);
        });
    });
  }

  handleAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  handleSignInClick = () => {
    this.auth.signIn();
  };

  handleSignOutClick = () => {
    this.auth.signOut();
  };

  // helper method
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          onClick={this.handleSignOutClick}
          className="ui red google button"
        >
          <i className="google icon" />
          sign out
        </button>
      );
    } else {
      return (
        <button
          onClick={this.handleSignInClick}
          className="ui blue google button"
        >
          <i className="google icon" />
          sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
