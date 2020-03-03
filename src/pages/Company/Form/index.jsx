import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import api from 'services/api';

import Form from './components/Form';

const CompanyForm = ({ ...props }) => {
  const [ company, setCompany ] = useState({});
  const id = props.match.params.id;
  const user = JSON.parse(localStorage.getItem('user'));

  const onSubmit = async values => {
    const company = Object.assign({}, values);

    let response;
    if (id) {
      response = await api.put(`/company/${id}`, company);
    } else {
      // send to user route
      response = await api.post('/user', company);
    }

    if (response.status === 200) {
      props.history.push('/company');
    }
  }

  useEffect(() => {
    if (id) {
      api.get(`/company/${id}`, { params: {
        toArray: btoa(JSON.stringify({
          only: [
            'id',
            'legalPerson',
            'type',
            'company',
          ],
          toArrayLegalPerson: {
            only: [
              'id',
              'name',
              'cnpj',
              'ie',
            ],
          },
        }))
      }}).then((response) => {
        setCompany(response.data);
      });
    }
  }, [id]);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={
        id ? company : {
          companies: [{
            type: user.company.type === 'COMPANY_MASTER' ? 'COMPANY_RESALE' : 'COMPANY_CLIENT',
            company: user.company.id,
          }]
        }
      }
    />
  );
}

export default withTranslation('common')(CompanyForm);
