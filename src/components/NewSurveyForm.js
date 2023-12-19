import React from 'react';
import PropTypes from 'prop-types';
import ReusableSurveyForm from './ReusableSurveyForm';
import { v4 } from 'uuid'; //to be removed

function NewSurveyForm(props){

  function handleNewSurveyFormSubmission(event) {
    event.preventDefault();
    props.onNewSurveyCreation({
      title: event.target.title.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
      id: v4(), //to be removed
    });
  }

  return (
    <React.Fragment>
      <ReusableSurveyForm
      formSubmissionHandler={handleNewSurveyFormSubmission}
      buttonText="Submit Survey" />
    </React.Fragment>
  );
}

NewSurveyForm.propTypes = {
  onNewSurveyCreation: PropTypes.func
};

export default NewSurveyForm;