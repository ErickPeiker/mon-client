import React, { useState, useEffect } from 'react';

import api from 'services/api';

import { SelectField } from '@owl-material';

const ItemTypeSelect = props => {
  const [itemTypes, setItemTypes ] = useState([]);

  const loadItemTypes = async () => {
    await api.get('/item-type', { params: {
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
		let allItemTypes = response.data.map((itemType) => ({
										value: itemType.id,
										label: itemType.name
									}));
		setItemTypes(allItemTypes);
    });
  }

  useEffect(() => {
    loadItemTypes();
  }, []);

  return (
    <SelectField
      { ...props }
      options={itemTypes}
    />
  );
}

export default ItemTypeSelect;
