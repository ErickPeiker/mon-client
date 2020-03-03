import React from 'react';

import api from 'services/api';

import SwitchCompanyForm from './Form';

const SwitchCompanyModal = ({
  open,
  onClose,
  ...props
}) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const onSubmit = async values => {
    console.log(values);
    const user = JSON.parse(localStorage.getItem('user'));

    await api.put(
      `/user/${user.id}`,
      {company: values.company},
      { params: {
        defaultFilters: btoa(JSON.stringify({
          company: false,
        }))
      }}
    ).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      window.location.reload();
    });
  }

  return (
    <SwitchCompanyForm
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        company: user.company.id
      }}
    />
  );
}

export default SwitchCompanyModal;
