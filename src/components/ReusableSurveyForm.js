import React from "react";
import PropTypes from "prop-types";

function ReusableSurveyForm(props) {
return (
  <React.Fragment>
  <form onSubmit={props.formSubmissionHandler}>
    <input
      type='text'
      name='title'
      placeholder='Title'
      required />
    <input
      type='text'
      name='question1'
      placeholder='Question 1'
      required />
    <input
      type='text'
      name='question2'
      placeholder='Question 2' />
    <input
      type='text'
      name='question3'
      placeholder='Question 3' />
    <button type='submit'>{props.buttonText}</button>
  </form>
  </React.Fragment>
  );
}

ReusableSurveyForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
}

export default ReusableSurveyForm;