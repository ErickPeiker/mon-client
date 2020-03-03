import React from 'react';
import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import { ADD_WIDGET, SET_WIDGET } from 'store/actions';

import { makeStyles } from '@material-ui/core/styles';

import { Button, Checkbox, GridContainer, GridItem, Modal, SelectField, TextField } from '@owl-material';
import { EquipmentSelect, ItemTypeSelect } from 'components/Field';

import WidgetService from 'services/widgetService';

const validate = values => {
	console.log("Real validation: "+JSON.stringify(values));
}

const DashboardWidgetModal = ({ idWidget, t, ...props }) => {
	/*
	###########################
	###	VARIÁVEIS DO REDUX
	###########################
	*/
	const dispatch = useDispatch();
	const widget = useSelector(state => state.dashboards.widget);

	/*
	###########################
	###	FUNÇÕES PARA O COMPONENTE
	###########################
	*/

	// const handleChangeCheck = event => {
	// 	console.log("Change checkbox: "+event.target.checked);
	// 	const newWidget = {...widget};
	// 	newWidget.showLegend = event.target.checked;
	// 	dispatch({
	// 		type: SET_WIDGET,
	// 		data: newWidget
	// 	})
	// };

	const handleChange = name => event => {
		console.log("Change checkbox: "+JSON.stringify(event));
		const newWidget = {...widget};
		newWidget.showLegend = event.target.checked;
		dispatch({
			type: SET_WIDGET,
			data: newWidget
		})
	};

	const openAddWidgetModal = () => {
		const newWidget = {...widget};
		newWidget.open = !newWidget.open;
		dispatch({
			type: SET_WIDGET,
			data: newWidget
		})
	}

	const preSubmit = (data) => {
		const newWidget = {...data};
		newWidget.open = widget.open;
		dispatch({
			type: SET_WIDGET,
			data: newWidget
		})

		const widgetFormatted = {...data};
		WidgetService.saveWidget(widgetFormatted)
		.then(ok => {
			openAddWidgetModal();
		})
		.catch(error => {
			alert(error);
		})
	}

	/*
	*	ESTILIZAÇÃO
	*/
	const useStyles = makeStyles(theme => ({
		paper: {
			position: 'absolute',
			width: '100%',
			backgroundColor: '#FFF',
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
			top:'10%',
		}
	}));

	const classes = useStyles();
	const { error, handleSubmit, pristine, reset, submitting } = props;

	return (
		<Modal
			open={widget.open}
			scroll="body" >
			<form onSubmit={handleSubmit(preSubmit)}>
				<GridContainer className={classes.paper}>
					<GridItem xs={12}>
						<h2 id="simple-modal-title">Widgets</h2>
					</GridItem>
					<GridItem  xs={6}>
						<Field
							name="widget.chartType"
							label={t('chart type')}
							component={SelectField}
							options={[
							{ value: 'donut', label: 'Donut', icon: 'pie_chart' },
							]}
							required />
					</GridItem>
					<GridItem  xs={6}>
						<Field
							name="widget.refresh"
							label={t('auto refresh')}
							component={SelectField}
							options={[
								{ value: '1', label: '1 minuto' },
								{ value: '2', label: '2 minutos' },
								{ value: '5', label: '5 minutos' },
								{ value: '10', label: '10 minutos' },
							]}
							required />
					</GridItem>
					<GridItem  xs={6}>
						<Field
							label={t('equipment')}
							name='widget.equipment'
							component={EquipmentSelect}
							required
							/>
					</GridItem>
					<GridItem  xs={6}>
						<Field
							label={t('show data')}
							name='widget.itemType'
							component={ItemTypeSelect}
							required />
					</GridItem>
					<GridItem  xs={6}>
						<Field
							name="widget.itemLimiter"
							label={t('item quantity')}
							component={TextField}
							type="number"
							max="10"
							min="1"
							required />
					</GridItem>
					<GridItem  xs={6}>
						<Field
							name="widget.historyLimiter"
							label={t('history time')}
							component={SelectField}
							options={[
								{ value: '10', label: '10 minutos' },
								{ value: '20', label: '20 minutos' },
								{ value: '30', label: '30 minutos' },
								{ value: '60', label: '60 minutos' },
							]}
							required />
					</GridItem>
					{/* <GridItem  xs={12}>
						 <Field
							 name="widget.showLegend"
							 component={Checkbox}
							checked={widget.showLegend}
							onChange={handleChange('checkedA')}
							value="checkedA"
							inputProps={{
								'aria-label': 'primary checkbox',
							}} />
						<Field
							name="widget.showLegend"
							label={t('show legend')}
							value="Apareceu valor"
							component={Checkbox} />
					</GridItem> */}
					<GridItem  xs={12}>
						<Button
							color='primary'
							type='submit' >
								Salvar
						</Button>
						<Button
							color='secondary'
							type='reset'
							onClick={openAddWidgetModal}>
								Cancelar
						</Button>
					</GridItem>
				</GridContainer>
			</form>
		</Modal>
	)
}

export default reduxForm({
	form: 'dashboardWidgetModal',
	validate,
	initialValues: {},
  })(withTranslation('common')(DashboardWidgetModal));
