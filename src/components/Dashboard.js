import React from 'react';
import Survey from './Survey';
import Response from './Response';
import PropTypes from 'prop-types';
// import ResponseList from './ResponseList';

function Dashboard(props) {
  // const { onSelectingResponse } = props;
  

  return (
    <React.Fragment>
      <hr />
      <h1>Your Surveys:</h1>
      {Array.isArray(props.surveyList) && props.surveyList.map((survey) =>
        <Survey
          title={survey.title}
          question1={survey.question1}
          question2={survey.question2}
          question3={survey.question3}
          id={survey.id}
          key={survey.id}/>
      )}
      <h1>Your Responses</h1>
      <hr />
      {Array.isArray(props.responseList) && props.responseList.map((response) =>
        <Response
        whenResponseClicked={props.onResponseSelection}
        respondingTo={response.respondingTo}
        response1={response.response1}
        response2={response.response2}
        response3={response.response3}
        id={response.id}
        key={response.id}
        />
      )}
      {/* <button onClick={()=> onBackToSurveyDetail }></button> */}
      {/* <button onClick={()=> onSelectingResponse }></button> */}
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  surveyList: PropTypes.array,
  responseList: PropTypes.array,
  onSelectingResponse: PropTypes.func,
}

export default Dashboard;