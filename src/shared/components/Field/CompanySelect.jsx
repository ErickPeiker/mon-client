import React, { useState, useEffect } from 'react';

import api from 'services/api';

import { SelectField } from '@owl-material';

const CompanySelect = ({ defaultFilters, ...props }) => {
  const [companies, setCompanies ] = useState([]);

  useEffect(() => {
    const loadCompanies = async () => {
      await api.get('/company', { params: {
        filters: btoa(JSON.stringify([
          {
            type: 'select',
            fields: [
              'id',
              'legalPerson.name',
            ],
          },
          {
            type: 'orderBy',
            field: 'legalPerson.name',
            order: 'ASC',
          },
        ])),
        defaultFilters: btoa(JSON.stringify(defaultFilters)),
      }}).then((response) => {
        setCompanies(response.data.map((company) => (
          { value: company.id, label: company.legalPerson_name }
        )));
      });
    }

    loadCompanies();
  }, [defaultFilters]);

  return (
    <SelectField
      { ...props }
      options={companies}
    />
  );
}

CompanySelect.defaultProps = {
  defaultFilters: [],
}

export default CompanySelect;
