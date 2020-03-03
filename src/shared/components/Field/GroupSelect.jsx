import React, { useState, useEffect } from 'react';

import api from 'services/api';

import { SelectField } from '@owl-material';

const GroupSelect = props => {
  const [groups, setGroups ] = useState([]);

  const loadGroups = async () => {
    await api.get('/group', { params: {
      filters: btoa(JSON.stringify([
        {
          type: 'select',
          fields: [
            'id',
            'name',
          ],
        },
        {
          type: 'orderBy',
          field: 'name',
          order: 'ASC',
        },
      ])),
    }}).then((response) => {
      setGroups(response.data.map((group) => (
        { value: group.id, label: group.name }
      )));
    });
  }

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <SelectField
      { ...props }
      options={groups}
    />
  );
}

export default GroupSelect;
