import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import socketIOClient from 'socket.io-client';

import { GridContainer, GridItem } from '@owl-material';

import AdvancedTableResult from './AdvancedTableResult';
import AdvancedGraphicResult from './AdvancedGraphicResult';
import FilterForm from './FilterForm';

const socket = socketIOClient(process.env.REACT_APP_API_V2_URL, {
  query: { token: JSON.parse(localStorage.getItem('apiToken')) },
  reconnectionDelay: 2000,
  reconnectionDelayMax: 30000,
  timeout: 360000
});

const Report = ({ closable, closeReport, reportId, t, ...props }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('Graphic');
  const [selectedItemTypes, setSelectedItemTypes] = useState([]);

  useEffect(() => {

    socket.on('connect', function(){
        console.log('Connected');
    });

    socket.on('disconnect', function () {
      console.log('Disconnected');
    });

    socket.on('errorReportExecution', teste => {
      console.log('errorReportExecution');
      console.log(teste);
    });

    socket.on('connect_error', (teste) => {
      console.log('connect_error');
      console.log(teste);

    });

    socket.on('returnReport', reportData => {
      if (reportData.reportId === reportId) {
        setIsLoading(false);
        setData(d => reportData.data);
      }
    });
  }, [reportId]);

  const onSubmit = async (formData, index) => {

	console.log(formData);

    if (!formData.equipment) {
      alert('Selecione um equipamento');
      return;
	}

    if (!formData.itemType || formData.itemType.length === 0) {
      alert('Selecione pelo menos um tipo de item para mostrar');
      return;
	}

    if (formData.type === 'AdvancedTable' && formData.itemType && formData.itemType.length > 2) {
      alert('Você deve selecionar apenas 2 tipos de dados para mostrar');
      return;
	}

    if ((formData.type === 'AdvancedTable' || formData.type === 'AdvancedGraphic')) {

      formData.nfdumpFilters = [];

      if (formData.itemType0) {
        if (formData.filterItemType0) {
          formData.nfdumpFilters.push({"itemType" : formData.itemType0, "filter":  formData.filterItemType0});
        } else {
          alert('Ao escolher um tipo de item , digite um filtro');
          return;
        }
      }

      if (formData.itemType1) {
        if (formData.filterItemType1) {
          formData.nfdumpFilters.push({"itemType" : formData.itemType1, "filter":  formData.filterItemType1});
        } else {
          alert('Ao escolher um tipo de item , digite um filtro');
          return;
        }
      }

      if (formData.itemType2) {
        if (formData.filterItemType2) {
          formData.nfdumpFilters.push({"itemType" : formData.itemType2, "filter":  formData.filterItemType2});
        } else {
          alert('Ao escolher um tipo de item , digite um filtro');
          return;
        }
      }

      if (formData.itemType3) {
        if (formData.filterItemType3) {
          formData.nfdumpFilters.push({"itemType" : formData.itemType3, "filter":  formData.filterItemType3});
        } else {
          alert('Ao escolher um tipo de item , digite um filtro');
          return;
        }
      }

    setIsLoading(true);
    setType(formData.type);

    let itemsTypeSelected = [...formData.itemType];
    setSelectedItemTypes(itemsTypeSelected);

    console.log(formData);
    socket.emit('generateReport', { reportId: reportId, filters: { limit: 10, ...formData }});
    setData([]);
	}
}

  return (
    <GridContainer>
      <GridItem xs={12}>
        <FilterForm
          closable={closable}
          closeReport={() => closeReport(reportId)}
          onSubmit={(formData) => onSubmit(formData, reportId)}
          loading={isLoading}
          form={`reportFilterForm-${reportId}`}
        />
      </GridItem>
      { (!!data.length || isLoading) &&
        <GridItem xs={12}>
          { type === 'AdvancedTable' &&
                <AdvancedTableResult
                  data={data}
                  loading={isLoading}
                  selectedItemTypes={selectedItemTypes}
                />
          }
          { type === 'AdvancedGraphic' &&
                <AdvancedGraphicResult
                  data={data}
            loading={isLoading}
            selectedItemTypes={selectedItemTypes}
                />
          }
        </GridItem>
      }
    </GridContainer>
  );
}

export default withTranslation('common')(Report);
