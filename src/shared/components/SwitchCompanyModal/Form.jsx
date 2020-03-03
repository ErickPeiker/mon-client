import React from 'react';
import { withTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';

import { Button, Dialog } from '@owl-material';

import { CompanySelect } from 'components/Field';
import SubmitButtom from 'components/Button/Submit';

const SwitchCompanyForm = ({
  handleSubmit,
  open,
  onClose,
  t,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={t('switch company')}
      actions={
        <>
          <Button variant='text' onClick={onClose}>
            {t('cancel')}
          </Button>
          <SubmitButtom formName='SwitchCompanyForm'>
            {t('save')}
          </SubmitButtom>
        </>
      }
      fullWidth
      maxWidth='xs'
    >
      <form onSubmit={handleSubmit}>
        <Field
          label={t('company')}
          name='company'
          component={CompanySelect}
          defaultFilters={{company: false}}
          required
        />
      </form>
    </Dialog>
  );
}

export default reduxForm({
  form: 'SwitchCompanyForm',
  enableReinitialize: true,
})(withTranslation('common')(SwitchCompanyForm));
