import api from './apiV2';

const getDashboards = async () => {
	return await api.get('/dashboard')
		.then( (response) => {
			return response.data;
		});
}

const getActiveDashboard = async (dashboards) => {
	const listActive = await dashboards.filter((item) => item.active);
	return listActive[0];
}

const putDashboard = async() => {

}

const addDashboard = async() => {

}

const removeDashboard = async() => {

}

const dashboard = {
	getActiveDashboard,
	getDashboards,
	putDashboard,
	addDashboard,
	removeDashboard,
  };

 export default dashboard;
