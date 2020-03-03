import React from 'react';
import styled from 'styled-components';

import AppBar from 'components/AppBar';
import Drawer from 'components/Drawer';

const Root = styled.div`
  display: flex;
`

const Content = styled.div`
  flex-grow: 1;
  margin-top: 64px;
  padding: 12px;
`

const Layout = props => (
  <Root>
    <AppBar />
    <Drawer />
    <Content>
      {props.children}
    </Content>
  </Root>
);

export default Layout;
