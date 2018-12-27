import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  renderError = ({ errors, touched }) => {
    if (touched && errors) {
      return (
        <div className="ui error message">
          <div className="header">{errors}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.errors && meta.touched ? `error` : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = values => {
    this.props.handleSubmitButton(values);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        {/* Filed component impored from redux-form and not created by me, i'll use it when i want to show a field (type of input like input/checkbox/textinput/dropdown/radioButton) to a user. we must use the name prop to assosiet the input to the Filed */}
        <Field
          name="title"
          component={this.renderInput}
          label="Enter your Name"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description "
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validateFieldsForm = fieldsValues => {
  const errors = {};

  if (!fieldsValues.title) {
    errors.title = "Enter Title Name";
  }

  if (!fieldsValues.description) {
    errors.description = " Enter description ";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validateFieldsForm
})(StreamForm);
