import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  renderButtons = () => {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          to={"/"}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={"/"} className="ui button ">
          Cancle
        </Link>
      </React.Fragment>
    );
  };

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderContent = () => {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream with title: ${
      this.props.stream.title
    } ?`;
  };

  render() {
    return (
      <Modal
        content={this.renderContent()}
        title="Delete Stream"
        actions={this.renderButtons()}
        handleDismissModal={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
