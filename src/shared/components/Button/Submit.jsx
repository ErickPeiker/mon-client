import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

import { Button } from '@owl-material';

const SubmitButton = ({ children, dispatch, formName, ...props }) => (
  <Button
    type={formName ? 'button' : 'submit'}
    color='primary'
    onClick={() => dispatch(submit(formName))}
  >
    {children}
  </Button>
);

SubmitButton.defaultProps = {
  formName: '',
}

export default connect()(SubmitButton);
