import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
  handleSubmitButton = values => {
    this.props.createStream(values);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm handleSubmitButton={this.handleSubmitButton} />
      </div>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);
