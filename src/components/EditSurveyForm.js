import React from 'react';
import ReusableSurveyForm from './ReusableSurveyForm';
import PropTypes from 'prop-types';

function EditSurveyForm(props) {
  const { survey } = props;

  function handleEditSurveyFormSubmission(event) {
    event.preventDefault();
    props.onEditSurvey({
      name: event.target.name.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
      id: survey.id
    });
  }

  return (
    <React.Fragment>
      <ReusableSurveyForm
        formSubmissionHandler={handleEditSurveyFormSubmission}
        buttonText="Update Survey" />
    </React.Fragment>
  );
}

EditSurveyForm.propTypes = {
  onEditSurvey: PropTypes.func,
  survey: PropTypes.object
};

export default EditSurveyForm;


