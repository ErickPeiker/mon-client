import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import api from 'services/api';

import { Table } from '@owl-material';

const EquipmentList = ({ t, ...props}) => {
  const [ equipments, setEquipments ] = useState([]);
  const [ loading, setLoading ] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const columns = [
    {
      field: 'company.legalPerson.name',
      title: t('company'),
      hidden: user.company.type === 'COMPANY_CLIENT',
    },
    {
      field: 'name',
      title: t('name'),
    },
    {
      field: 'ip',
      title: t('ip'),
    },
    {
      field: 'equipmentType.name',
      title: t('equipment type'),
    },
    {
      field: 'isActive',
      title: t('is active'),
      type: 'boolean',
    },
  ];
  const actions = [
    {
      icon: 'edit',
      tooltip: t('edit'),
      onClick: (e, data) => {
        props.history.push('/equipment/edit/' + data.id);
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    api.get('/equipment', { params: {
      filters: btoa(JSON.stringify([
        {
          type: 'orderBy',
          field: 'name',
          order: 'ASC',
        },
      ])),
      toArray: btoa(JSON.stringify({
        only: [
          'id',
          'name',
          'equipmentType',
          'isActive',
          'ip',
          'company',
        ],
        toArrayEquipmentType: {
          only: [
            'id',
            'name',
          ],
        },
        toArrayCompany: {
          only: [
            'id',
            'legalPerson',
          ],
          toArrayLegalPerson: {
            only: [
              'id',
              'name'
            ],
          },
        },
      }))
    }}).then((response) => {
      setEquipments(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <Table
      actions={actions}
      title={t('equipments')}
      columns={columns}
      data={equipments}
      loading={loading}
    />
  );
}

export default withTranslation('common')(EquipmentList);
