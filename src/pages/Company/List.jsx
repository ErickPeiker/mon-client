import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import api from 'services/api';

import { Table } from '@owl-material';

const CompanyList = ({ t, ...props}) => {
  const [ companies, setCompanies ] = useState([]);
  const [ loading, setLoading ] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const columns = [
    {
      field: 'legalPerson_name',
      title: t('name'),
    },
    {
      field: 'type',
      title: t('type'),
      lookup: {
        'COMPANY_MASTER': t('administrator'),
        'COMPANY_CLIENT': t('client'),
        'COMPANY_RESALE': t('resale'),
      },
    },
  ];
  const actions = [
    {
      icon: 'edit',
      tooltip: t('edit'),
      onClick: (e, data) => {
        props.history.push('/company/edit/' + data.id);
      },
    },
    {
      icon: 'delete',
      tooltip: t('delete'),
      onClick: (e, data) => {
        const confirmation = window.confirm('Tem certeza que deseja excluir?');
        if (confirmation) {
          setLoading(true);
          api.delete('/company/' + data.id).then((response) => {
            setCompanies(companies.filter(company => company.id !== data.id));
            setLoading(false);
          });
        }
      },
    },
    {
      icon: 'add',
      tolltip: t('add'),
      isFreeAction: true,
      hidden: user.company.type === 'COMPANY_CLIENT',
      onClick: () => {
        props.history.push('/company/new');
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    api.get('/company', { params: {
      filters: btoa(JSON.stringify([
        {
          type: 'select',
          fields: [
            'id',
            'legalPerson.name',
            'type',
            'company.id',
          ],
        },
        {
          type: 'orderBy',
          field: 'legalPerson.name',
          order: 'ASC',
        },
      ]))
    }}).then((response) => {
      setCompanies(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <Table
      actions={actions}
      title={t('companies')}
      columns={columns}
      data={companies}
      loading={loading}
      parentChildData={(row, rows) => rows.find(a => a.id === row.company_id)}
    />
  );
}

export default withTranslation('common')(CompanyList);
