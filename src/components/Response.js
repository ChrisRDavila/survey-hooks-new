import React from 'react';
import PropTypes from 'prop-types';

function Response(props) {

  return (
  <React.Fragment>
    <div onClick = {() => props.whenResponseClicked(props.id)}>
      <h3>{survey.title}</h3>
      <p>{props.response1}</p>
      <p>{props.response2}</p>
      <p>{props.response3}</p>
    </div>
  </React.Fragment>
  );
}

  Survey.propTypes = {
    title: PropTypes.string,
    response1: PropTypes.string,
    response2: PropTypes.string,
    response3: PropTypes.string,
    id: PropTypes.string,
    whenResponseClicked: PropTypes.func
  }

  export default Response;