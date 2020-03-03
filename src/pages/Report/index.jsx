import React, { Fragment, useState } from 'react';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Fab, Divider, GridContainer, GridItem, Icon } from '@owl-material';

import Report from './components/Report';

const StyledDivider = styled(Divider)`
  flex-grow: 1;
`

const DividerWrap = styled(GridItem)`
  display: flex;
  align-items: center;
`

const ReportPage = ({ t, ...props }) => {
  const [reports, setReports] = useState([true]);

  const closeReport = (key) => {
    setReports(reports.map((report, index) => key === index ? false : report));
  }

  const showReportsLength = reports.filter((report) => report).length;

  return (
    <GridContainer>
      { reports.map((show, index) => (
        <Fragment key={index}>
          { show &&
            <>
              <GridItem xs={12}>
                <Report reportId={index} closable={showReportsLength > 1} closeReport={closeReport} />
              </GridItem>
              { (index + 1) < showReportsLength &&
                <DividerWrap xs={12}>
                  <StyledDivider />
                </DividerWrap>
              }
            </>
          }
        </Fragment>
      ))}
      <GridItem>
        <Fab
          size='small'
          color='primary'
          onClick={() => setReports([...reports, true])}
        >
          <Icon>add</Icon>
        </Fab>
      </GridItem>
      <DividerWrap xs>
        <StyledDivider />
      </DividerWrap>
    </GridContainer>
  );
}

export default withTranslation('common')(ReportPage);
