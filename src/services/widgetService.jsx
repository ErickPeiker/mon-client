//import SocketService from 'services/socket';
import api from './apiV2';
import socketIOClient from 'socket.io-client';
import {subtractMinutes} from  'shared/utils'

const getDataToWidgets = async (widget) => {

	console.log('Entrou na função getDataToWidgets: '+JSON.stringify(widget));

	const socket = socketIOClient(process.env.REACT_APP_API_V2_URL, {
		query: { token: JSON.parse(localStorage.getItem('apiToken')) },
		reconnectionDelay: 2000,
		reconnectionDelayMax: 30000,
		timeout: 30000
	});

	console.log(socket);

	const connection = socket.on('connect', function(){
		console.log('Connected');

		socket.on('disconnect', function () {
			console.log('Disconnected');
		});

		socket.on('errorReportExecution', teste => {
			console.log('errorReportExecution');
			console.log(teste);
		});

		let preparedFilter = {
			type: 'Widget',
			equipment: widget.parameters.equipments[0],
			itemType: widget.parameters.itemType,
			limit: widget.parameters.itemLimiter,
			startDate: new Date(),
			endDate: new Date()
		}
		preparedFilter.startDate = subtractMinutes(preparedFilter.endDate, widget.parameters.historyLimiter);
		console.log('Filtro preparado para executar busca de dados do widget: '+preparedFilter);
		socket.emit('generateReport', { reportId: widget.id , filters: preparedFilter});

		socket.on('returnReport', reportData => {
			console.log('reportData: '+JSON.stringify(reportData));
			return reportData.data;
		});
	});

	return await connection();
}

const saveWidget = async (widget) => {
	return await api.post('/widget')
		.then( (response) => {
			return response.data;
		});
}



const widgets = {
	getDataToWidgets,
	saveWidget
}

export default widgets;
