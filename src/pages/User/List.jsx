import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import api from 'services/api';

import { Table } from '@owl-material';

const UserList = ({ t, ...props}) => {
  const [ users, setUsers ] = useState([]);
  const [ loading, setLoading ] = useState([]);

  const columns = [
    {
      field: 'physicalPerson.name',
      title: t('name'),
    },
    {
      field: 'email',
      title: t('email'),
    },
  ];
  const actions = [
    {
      icon: 'edit',
      tooltip: t('edit'),
      onClick: (e, data) => {
        props.history.push('/user/edit/' + data.id);
      },
    },
    {
      icon: 'delete',
      tooltip: t('delete'),
      onClick: (e, data) => {
        const confirmation = window.confirm('Tem certeza que deseja excluir?');
        if (confirmation) {
          setLoading(true);
          api.delete('/user/' + data.id).then((response) => {
            setUsers(users.filter(user => user.id !== data.id));
            setLoading(false);
          });
        }
      },
    },
    {
      icon: 'add',
      tolltip: t('add'),
      isFreeAction: true,
      onClick: () => {
        props.history.push('/user/new');
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    api.get('/user', { params: {
      filters: btoa(JSON.stringify([
        {
          type: 'orderBy',
          field: 'physicalPerson.name',
          order: 'ASC',
        },
      ])),
      toArray: btoa(JSON.stringify({
        only: [
          'id',
          'email',
          'physicalPerson',
        ],
        toArrayPhysicalPerson: {
          only: [
            'name',
            'cpf',
          ],
        },
      }))
    }}).then((response) => {
      setUsers(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <Table
      actions={actions}
      title={t('users')}
      columns={columns}
      data={users}
      loading={loading}
    />
  );
}

export default withTranslation('common')(UserList);
