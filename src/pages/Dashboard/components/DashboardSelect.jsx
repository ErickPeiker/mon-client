import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { BottomNavigation, BottomNavigationAction, GridContainer, GridItem, Icon, Typography } from '@owl-material';
//import api from 'services/api';
import { useDispatch, useSelector } from 'react-redux';

const DashboardSelect = ({ t, ...props }) => {

	/*
	###########################
	###	VARIÁVEIS DO REDUX
	###########################
	*/
	const dispatch = useDispatch();
	const activeDashboard = useSelector(state => state.dashboards.activeDashboard);

	/*
	###########################
	###	FUNÇÕES PARA O COMPONENTE
	###########################
	*/
	const goFullscreen = () => {
		document.getElementById('dashboard').webkitRequestFullscreen();
	}

	/*
	###########################
	###	CRIAÇÃO DA VIEW DO COMPONENTE
	###########################
	*/
	return (
		<Fragment>
			<GridContainer justify="center" key={activeDashboard.id}>
				<GridItem  xs={8}>
					<Typography variant='h4'>{activeDashboard.name}</Typography>
				</GridItem>
			</GridContainer>
			<GridContainer justify="flex-end">
				<GridItem  xs={4}>
					<BottomNavigation showLabels={true}>
						<BottomNavigationAction label={t('edit')} icon={<Icon>{'edit-rounded'}</Icon>} />
						<BottomNavigationAction label={t('add')} icon={<Icon>{'add-rounded'}</Icon>} />
						<BottomNavigationAction label={t('fullscreen')} icon={<Icon>{'fullscreen-rounded'}</Icon>} onClick={goFullscreen}/>
					</BottomNavigation>
				</GridItem>
			</GridContainer>
		</Fragment>
	)
}

export default withTranslation('common')(DashboardSelect);
