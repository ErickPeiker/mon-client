import React from 'react';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ResponsiveContainer } from 'recharts';
import { BottomNavigation,  BottomNavigationAction, Card, CardActions, CardContent, GridContainer, GridItem, Icon, IconButton, PieChart, Typography } from '@owl-material';

import { SET_WIDGET, SET_ACTIVE_DASHBOARD } from 'store/actions';
import WidgetService from 'services/widgetService';

const DashboardWidgets = ({t, ...props }) => {

	/*
	###########################
	###	VARIÁVEIS DO REDUX
	###########################
	*/
	const dispatch = useDispatch();
	const activeDashboard = useSelector(state => state.dashboards.activeDashboard);
	const widget = useSelector(state => state.dashboards.widget);

	/*
	###########################
	###	FUNÇÃO PARA INICIAÇÃO DO COMPONENTE
	###########################
	*/
	// const promissesAll = activeDashboard.widgets.map( (widget) => {
	// 	return WidgetService.getDataToWidgets(widget) || [];
	// });

	// console.log(JSON.stringify(promissesAll));

	// console.log(JSON.stringify(promissesAll.length));

	// Promise.all(promissesAll)
	// .then(function (results) {
	// 	console.log('Resultado promisse: '+JSON.stringify(results.data));
	// 	const newActiveDashboard = {...activeDashboard, widgets : results};
	// 	//console.log("Widgets com dados: "+JSON.stringify(newActiveDashboard));
	// 	dispatch({
	// 		type: SET_ACTIVE_DASHBOARD,
	// 		data: newActiveDashboard
	// 	})
	// })

	/*
	###########################
	###	FUNÇÕES PARA O COMPONENTE
	###########################
	*/
	const openAddWidgetModal = () => {
		const newWidget = {...widget};
		newWidget.open = !newWidget.open;
		dispatch({
			type: SET_WIDGET,
			data: newWidget
		})
	}

	const onClickInPieChart = (id)  => {
		console.log(id);
	}

	const formatter = (value) => {
		if (value === 0) return '0 Bytes';

		const k = 1000;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(value) / Math.log(k));

		return parseFloat((value / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	  }

	const goFullscreenToWidget = (cardOfWidget) => {
		document.getElementById(cardOfWidget).webkitRequestFullscreen();
	}


	/*
	###########################
	###	CRIAÇÃO DA VIEW DO COMPONENTE
	###########################
	*/
	return (
		<GridContainer>
			{activeDashboard.widgets.map((widget) => (
				<GridItem xs={4} key={widget.id}>
					<Card id={'widget'+widget.id}>
						<CardActions>
							<GridContainer alignItems="center" justify="center">
								<GridItem xs={9}>
									<Typography variant='subtitle1' index={widget.id}>{widget.name}</Typography>
								</GridItem>
							</GridContainer>
							<BottomNavigation justify="rigth" xs={3}>
								<BottomNavigationAction
									label={t('edit')}
									style={{padding: 0, minWidth: 40}}
									icon={
										<Icon style={{ fontSize: 14 }}>{'edit-rounded'}</Icon>
									}
									onClick={openAddWidgetModal}
									/>
								<BottomNavigationAction
									label={t('refresh')}
									style={{padding: 0, minWidth: 40}}
									icon={
										<Icon style={{ fontSize: 14}}>{'refresh-rounded'}</Icon>
									}/>

								<BottomNavigationAction
									label={t('move')}
									style={{padding: 0, minWidth: 40}}
									icon={
										<Icon style={{ fontSize: 14 }}>{'drag-indicator-rounded'}</Icon>
									}/>
								<BottomNavigationAction
									label={t('fullscreen')}
									style={{padding: 0, minWidth: 40}}
									icon={
										<Icon style={{ fontSize: 14 }}>{'fullscreen-rounded'}</Icon>
									}
									onClick={() => goFullscreenToWidget('widget'+widget.id)} />
							</BottomNavigation>
						</CardActions>
						<CardContent>
							{
							 widget.data &&
							<PieChart
								data={widget.data}
								height={'100%'}
								onClick={onClickInPieChart}
								valueFormatter={formatter}
								showLegend={false} />
							}
						</CardContent>
					</Card>
				</GridItem>
			))}
			<GridItem xs={4}>
				<Card id={'widget'+widget.id}>
					<ResponsiveContainer height={270}>
						<BottomNavigation showLabels className="flex-align">
							<BottomNavigationAction
								label={t('Clique para adicionar um novo gráfico')}
								icon={<Icon style={{fontSize: 48}}>{'add-rounded'}</Icon>}
								onClick={openAddWidgetModal} />
						</BottomNavigation>
					</ResponsiveContainer>
				</Card>
			</GridItem>
		</GridContainer>
	)
}

export default withTranslation('common')(DashboardWidgets);
