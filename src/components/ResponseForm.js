import React from 'react';
import PropTypes  from 'prop-types';

function ResponseForm(props){
  
  function handleNewResponseFormSubmission(event) {
    event.preventDefault();
    props.onNewResponseCreation({
      selectedSurvey: event.target.selectedSurvey.value,
      response1: event.target.response1.value,
      response2: event.target.response2.value,
      response3: event.target.response3.value,
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleNewResponseFormSubmission}>
        {/* <select name='selectedSurvey'>
          {props.surveyList.map((survey, index) =>
            <option value={survey.id} key={index}>{survey.title}</option>
          )}
        </select> */}
        <input
          type='text'
          name='response1'
          placeholder='Response 1' />
        <input
          type='text'
          name='response2'
          placeholder='Response 2' />
        <input
          type='text'
          name='response3'
          placeholder='Response 3' />
        <button type='submit'>Submit</button>
      </form>
    </React.Fragment>
  );
}