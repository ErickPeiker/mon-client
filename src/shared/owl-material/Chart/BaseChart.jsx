import React from 'react';
import styled from 'styled-components';

const Legend = styled.div`
  margin-left: 10px;
`

const Tooltip = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 5px;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
`

const ItemList = styled.ul`
  padding: 0;
  list-style: none;
`

const Item = styled.li`
  display: flex;
  align-items: center;
`

const Separator = styled.hr`
  min-width: 10px;
  margin: 0 10px;
  flex-grow: 1;
`

const ItemDot = styled.span`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
`

const ItemValue = styled.span`
  margin-left: auto;
`

export const renderLegend = ({ payload, ...props }) => (
  <Legend>
    <ItemList>
      {!!payload && payload.map((entry, index) => (
        <Item key={index}>
          <ItemDot style={{ backgroundColor: entry.color }} />
          <span className='recharts-item-name'>{entry.name}</span>
          <Separator />
          <ItemValue>{entry.value}</ItemValue>
        </Item>
      ))}
    </ItemList>
  </Legend>
);

export const renderTooltip = ({ formatter, payload, ...props }) => {
  const orderedPayload = payload ? payload.sort((a, b) => (
    b.value - a.value
  )) : [];

  return (
    <Tooltip>
      <p className='recharts-tooltip-label'>Label</p>
      <ItemList>
        {orderedPayload.map((entry, index) => (
          <Item key={index}>
            <ItemDot style={{ backgroundColor: entry.color }} />
            <span className='recharts-item-name'>{entry.dataKey}</span>
            <Separator />
            <ItemValue>{formatter(entry.value)}</ItemValue>
          </Item>
        ))}
      </ItemList>
    </Tooltip>
  );
}
