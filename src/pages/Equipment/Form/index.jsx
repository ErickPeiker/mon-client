import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import api from 'services/api';

import Form from './components/Form';

const EquipmentForm = ({ ...props }) => {
  const [ equipment, setEquipment ] = useState({});
  const id = props.match.params.id;

  const onSubmit = async values => {
    const equipment = Object.assign({}, values);

    let response;
    response = await api.put(`/equipment/${id}`, equipment);

    if (response.status === 200) {
      props.history.push('/equipment');
    }
  }

  useEffect(() => {
    api.get(`/equipment/${id}`, { params: {
      toArray: btoa(JSON.stringify({
        only: [
          'id',
          'name',
          'observation',
          'ip',
          'equipmentType.name',
        ],
      }))
    }}).then((response) => {
      setEquipment({
        ...response.data,
      });
    });
  }, [id]);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={equipment}
    />
  );
}

export default withTranslation('common')(EquipmentForm);
