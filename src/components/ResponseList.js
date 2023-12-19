import React from 'react';
import Response from './Response';
import PropTypes from 'prop-types';

function ResponseList(props) {
  
  return (
    <React.Fragment>
      <hr />
      {props.responseList.map((response) =>
        <Response
          whenSurveyClicked = { props.onSurveySelection }
          title={survey.title}
          response1={response.response1}
          response2={response.response2}
          question3={response.response3}
          id={response.id}
          key={response.id}/>
      )}
      </React.Fragment>
  );
}

    SurveyList.propTypes = {
      resposneList: PropTypes.array,
      onResponseSelection: PropTypes.func
    };

    export default ResponseList;