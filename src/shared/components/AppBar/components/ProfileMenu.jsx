import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Icon } from '@owl-material';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SwitchCompanyModal from 'components/SwitchCompanyModal';

const ProfileButton = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 14px;
  align-items: start;
`;

const ProfileMenu = ({ t, ...props }) => {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ modalOpen, setModalOpen ] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  return (
    <>
      <Button
        variant='text'
        color='inherit'
        icon={<Icon>account_circle</Icon>}
        aria-controls='profile-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <ProfileButton>
          <div>{user.physicalPerson.name}</div>
          <small>{user.company.legalPerson.name}</small>
        </ProfileButton>
      </Button>
      <Menu
        id='profile-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {setModalOpen(true); setAnchorEl(null);}}
        >
          {t('switch company')}
        </MenuItem>
        <MenuItem component={Link} to='/login'>{t('logout')}</MenuItem>
      </Menu>
      <SwitchCompanyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default withTranslation('common')(ProfileMenu);
