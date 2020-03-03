import React, { useState, useEffect } from 'react';

import api from 'services/api';

import { SelectField } from '@owl-material';

const EquipmentSelect = props => {
  const [equipments, setEquipments ] = useState([]);

  const loadEquipments = async () => {
    await api.get('/equipment', { params: {
      filters: btoa(JSON.stringify([
        {
          type: 'select',
          fields: [
            'id',
            'name',
            'company.legalPerson.name',
          ],
        },
        {
          type: 'orderBy',
          field: 'name',
          order: 'ASC',
        },
      ])),
    }}).then((response) => {
      setEquipments(response.data.map((equipment) => ({
        value: equipment.id,
        label: `${equipment.name} (${equipment.company_legalPerson_name})`,
      })));
    });
  }

  useEffect(() => {
    loadEquipments();
  }, []);

  return (
    <SelectField
      { ...props }
      options={equipments}
    />
  );
}

export default EquipmentSelect;
