import React from 'react';
import { withTranslation } from 'react-i18next';
import { GridContainer } from '@owl-material';

import DashboardSelect from './components/DashboardSelect';
import DashboardWidgets from './components/DashboardWidgets';
import DashboardWidgetModal from './components/DashboardWidgetModal';

import DashboardService from 'services/dashboardService';

import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_DASHBOARD } from 'store/actions';

const Dashboard = ({ ...props }) => {
	/*
	###########################
	###	VARIÁVEIS DO REDUX
	###########################
	*/
	const dispatch = useDispatch();
	const dashboard = useSelector(state => state.dashboards.activeDashboard);

	/*
	###########################
	###	FUNÇÃO PARA INICIAÇÃO DO COMPONENTE
	###########################
	*/

	console.log("1- "+JSON.stringify(dashboard));
	if (dashboard.id.length === 0) {
		console.log("2- "+JSON.stringify(dashboard));
		DashboardService.getDashboards()
		.then((dashboards) => {
			console.log("3- "+JSON.stringify(dashboards));
			DashboardService.getActiveDashboard(dashboards)
			.then( (activeDashboard) => {
				console.log("4- "+JSON.stringify(activeDashboard));
				dispatch({
					type: SET_ACTIVE_DASHBOARD,
					data: activeDashboard
				})
			})
		})
		.catch((error) => {
			alert('Erro no Get dos dashs');
			console.log('Erro no Get dos dashs: '+error);
		})
	}

	/*
	###########################
	###	FUNÇÕES PARA O COMPONENTE
	###########################
	*/


	/*
	###########################
	###	CRIAÇÃO DA VIEW DO COMPONENTE
	###########################
	*/
	return (
		dashboard.id.length > 0 &&
		<GridContainer id="dashboard" >
			<DashboardSelect />
			<DashboardWidgets />
			<DashboardWidgetModal />
		</GridContainer>
	)
}

export default withTranslation('common')(Dashboard);
