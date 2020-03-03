import{ ADD_WIDGET, GET_DASHBOARDS, SET_WIDGET, SET_ACTIVE_DASHBOARD } from 'store/actions/dashboardsActions';

let initialState = {
	activeDashboard: {
		id: '',
		widgets:[]
	},
	widget: {
		open: false,
		showLegend: true
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DASHBOARDS:
			return { ...state,  dashboards: action.data };
		case SET_ACTIVE_DASHBOARD:
			return {...state, activeDashboard: action.data}
		case ADD_WIDGET:
			return { ...state,  widget: action.data };
		case SET_WIDGET:
			return { ...state,  widget: action.data };
	  	default:
		  	return state;
	}
}

export default reducer;
