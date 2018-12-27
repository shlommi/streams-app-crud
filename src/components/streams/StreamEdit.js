import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  handleSubmitButton = updStream => {
    this.props.editStream(this.props.match.params.id, updStream);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading . . .</div>;
    }

    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          handleSubmitButton={this.handleSubmitButton}
        />
      </div>
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
  { fetchStream, editStream }
)(StreamEdit);
