import React from 'react';
import PropTypes from 'prop-types';

function SurveyDetail(props) {
  const { survey, onClickingDelete, onClickingEdit } = props;
  return (
    <React.Fragment>
      <h1>Survey Details</h1>
      <h3>{survey.title}</h3>
      <p>{survey.question1}</p>
      <p>{survey.question2}</p>
      <p>{survey.question3}</p>
      <button onClick={ onClickingEdit }>Update Survey</button>
      <button onClick={()=> onClickingDelete(survey.id) }>Delete Survey</button>
      <hr />
    </React.Fragment>
  );
}

SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default SurveyDetail;