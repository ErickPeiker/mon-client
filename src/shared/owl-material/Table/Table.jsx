import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';
import { LinearProgress } from '@owl-material';

// Format the unique keys from data array
const getColumnsFromData = data => {
  return data.map((elem) => (Object.keys(elem))).flat(1).filter(
    (elem, pos, arr) => arr.indexOf(elem) === pos
  ).map((elem) => ({
    field: elem,
    title: elem,
  }));
}

const Table = ({ actions, columns, data, loading, options, progress, title, ...props }) => {
  const [ filter, setFilter ] = useState(false);
  const newActions = [
    {
      icon: filter ? 'close' : 'filter_list',
      isFreeAction: true,
      onClick: () => {
        setFilter(!filter);
      },
    },
    ...actions,
  ];

  return (
    <>
      { !!loading &&
        <LinearProgress
          progress={progress}
        />
      }
      <MaterialTable
        {...props}
        title={title}
        columns={columns || getColumnsFromData(data)}
        data={data}
        actions={newActions}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100],
          search: filter,
          ...options,
        }}
      />
    </>
  );
}

Table.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.array,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
};

Table.defaultProps = {
  actions: [],
  title: '',
}

export default Table;
