import React from 'react';
import PropTypes from 'prop-types';

function EditResponseForm(props) {
  const { response } = props;

  function handleEditResponseFormSubmission(event) {
    event.preventDefault();
    props.onEditResponse({
      respondingTo: event.target.respondingTo.value,
      response1: event.target.response1.value,
      response2: event.target.response2.value,
      response3: event.target.response3.value,
      id: response.id
      
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleEditResponseFormSubmission}>
        <input
          type='text'
          name='respondingTo'
          placeholder='respondingTo' />
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

EditResponseForm.propTypes = {
  onEditResponse: PropTypes.func,
  response: PropTypes.object
};

export default EditResponseForm;
