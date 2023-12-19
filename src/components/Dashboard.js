import React from 'react';
import Survey from './Survey';
import Response from './Response';
import PropTypes from 'prop-types';

function Dashboard(props) {
  const { onClickingReturn } = props;
  

  return (
    <React.Fragment>
      <hr />
      {props.surveyList.map((survey) =>
        <Survey
          title={survey.title}
          question1={survey.question1}
          question2={survey.question2}
          question3={survey.question3}
          id={survey.id}
          key={survey.id}/>
      )}
      <hr />
      {props.responseList.map((response) =>
        <Response
        respondingTo={response.respondingTo}
        response1={response.response1}
        response2={response.response2}
        response3={response.response3}
        id={response.id}
        key={response.id}/>
      )}
      <button onClick={()=> onClickingReturn }></button>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  surveyList: PropTypes.array,
  responseList: PropTypes.array
}

export default Dashboard;