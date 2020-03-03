import React from 'react';
import { withTranslation } from 'react-i18next';

import { Table, TableGroupRow } from '@owl-material';

import { formatBits } from 'shared/utils';

const AnalyticReportResult = ({ data, loading, progress, selectedItemTypes, t, ...props }) => {
  console.log(selectedItemTypes);
  const columns = [
    {
      field: 'flow_out',
      title: t('destination ip'),
      hidden: !selectedItemTypes.includes('ac702049-d082-4738-8efb-6593dc7c8b3d'),
      customSort: (a, b, type) => (
        type === 'group' ? sortGroupBySum(a, b, 'flow_out') : a.flow_out.localeCompare(b.flow_out)
      ),
      defaultGroupSort: 'desc',
    },
    {
      field: 'flow_in',
      title: t('source ip'),
      hidden: !selectedItemTypes.includes('e5419d6a-6ce7-4c83-9a85-331bfc3fab86'),
      customSort: (a, b, type) => (
        type === 'group' ? sortGroupBySum(a, b, 'flow_in') : a.flow_in.localeCompare(b.flow_in)
      ),
      defaultGroupSort: 'desc',
    },
    {
      field: 'flow_port',
      title: t('port'),
      // type: 'numeric',
      hidden: !selectedItemTypes.includes('691c4399-ce06-4189-9133-c5455a0ec1c1'),
      customSort: (a, b, type) => (
        type === 'group' ? sortGroupBySum(a, b, 'flow_port') : (a.flow_port - b.flow_port)
      ),
      defaultGroupSort: 'desc',
    },
    {
      field: 'flow_protocol',
      title: t('protocol'),
      hidden: !selectedItemTypes.includes('80cf31d6-77b8-404d-be03-2aff2fbf4334'),
      customSort: (a, b, type) => (
        type === 'group' ? sortGroupBySum(a, b, 'flow_protocol') : a.flow_protocol.localeCompare(b.flow_protocol)
      ),
      defaultGroupSort: 'desc',
    },
    {
      field: 'value',
      title: t('bits'),
      render: data => (formatBits(data.value * 8)),
      grouping: false,
      filtering: false,
    },
  ];

  const sortGroupBySum = (a, b, itemType) => (
    sumGroupBits({
      data: data.filter((item) => (item[itemType] === a))
    }) - sumGroupBits({
      data: data.filter((item) => (item[itemType] === b))
    })
  );

  const sumGroupBits = (groupData, sum = 0) => (
    groupData.groups && groupData.groups.length ? (
      groupData.groups.reduce((sum, obj) => (sum + sumGroupBits(obj, 0)), 0)) : (
      sum + groupData.data.reduce((sum, obj) => (sum + obj.value), sum)
    )
  );

  return (
    <Table
      title={t('Table')}
      columns={columns}
      data={data}
      options={{
        filtering: true,
        grouping: true,
      }}
      loading={loading}
      progress={progress}
      components={{
        GroupRow: (props) => (
          <TableGroupRow
            {...props}
            groupData={{
              ...props.groupData,
              value: <>
                {props.groupData.value} - <i>({formatBits(sumGroupBits(props.groupData, 0) * 8)})</i>
              </>,
              data: [...props.groupData.data].splice(0, 100),
              groups: [...props.groupData.groups].splice(0, 100),
            }}
          />
        )
      }}
    />
  );
}

export default withTranslation('common')(AnalyticReportResult);
