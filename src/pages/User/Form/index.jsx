import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import api from 'services/api';

import Form from './components/Form';

const UserForm = ({ ...props }) => {
  const [ user, setUser ] = useState({});
  const id = props.match.params.id;

  const onSubmit = async values => {
    const user = {
      ...Object.assign({}, values),
      companies: [values.companies],
      groups: values.grous ? [values.groups] : null,
    };

    let response;
    if (id) {
      response = await api.put(`/user/${id}`, user);
    } else {
      response = await api.post('/user', user);
    }

    if (response.status === 200) {
      props.history.push('/user');
    }
  }

  useEffect(() => {
    if (id) {
      api.get(`/user/${id}`, { params: {
        toArray: btoa(JSON.stringify({
          only: [
            'id',
            'email',
            'physicalPerson',
            'groups',
            'companies',
          ],
          toArrayPhysicalPerson: {
            only: [
              'name',
              'cpf',
              'rg',
              'birthdate',
              'gender',
              'maritalStatus',
            ],
          },
        }))
      }}).then((response) => {
        setUser({
          ...response.data,
          // companies: response.data.companies.length ? response.data.companies[0] : null,
          // groups: response.data.groups.length ? response.data.groups[0] : null,
        });
      });
    }
  }, [id]);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={user}
    />
  );
}

export default withTranslation('common')(UserForm);
