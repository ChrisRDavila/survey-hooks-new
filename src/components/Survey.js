import React from 'react';
import PropTypes from 'prop-types';

function Survey(props) {

  return (
  <React.Fragment>
    <div onClick = {() => props.whenSurveyClicked(props.id)}>
      <h3>{props.title}</h3>
      <p>{props.question1}</p>
      <p>{props.question2}</p>
      <p>{props.question3}</p>
    </div>
  </React.Fragment>
  );
}

  Survey.propTypes = {
    title: PropTypes.string,
    question1: PropTypes.string,
    question2: PropTypes.string,
    question3: PropTypes.string,
    id: PropTypes.string,
    whenSurveyClicked: PropTypes.func
  }

  export default Survey;

