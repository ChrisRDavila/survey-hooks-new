import React from 'react';
import Response from './Response';
import PropTypes from 'prop-types';

function ResponseList(props) {
  
  return (
    <React.Fragment>
      <hr />
      {props.responseList.map((response) =>
        <Response
          // whenSurveyClicked = { props.onSurveySelection }
          respondingTo={response.respondingTo}
          response1={response.response1}
          response2={response.response2}
          response3={response.response3}
          id={response.id}
          key={response.id}/>
      )}
      </React.Fragment>
  );
}

    ResponseList.propTypes = {
      responseList: PropTypes.array,
      // onResponseSelection: PropTypes.func
    };

    export default ResponseList;