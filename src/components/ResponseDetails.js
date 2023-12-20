import React from 'react';
import PropTypes from 'prop-types';

function ResponseDetail(props) {
  const { response, onDeleteResponse, onEditResponse } = props;
  return (
    <React.Fragment>
      <h1>Response Details</h1>
      <h3>{response.respondingTo}</h3>
      <p>{response.response1}</p>
      <p>{response.response2}</p>
      <p>{response.response3}</p>
      <button onClick={ onEditResponse }>Update Response</button>
      <button onClick={()=> onDeleteResponse(response.id) }>Delete Response</button>
      {/* <button onClick={()=> onClickingDashboard(user.id) }>Go to Dashboard</button> */}
      <hr />
    </React.Fragment>
  );
}

ResponseDetail.propTypes = {
  response: PropTypes.object,
  survey: PropTypes.object,
  onDeleteResponse: PropTypes.func,
  onEditResponse: PropTypes.func,
  // onClickingDashboard: PropTypes.func
};

export default ResponseDetail;