import { combineReducers, createStore } from 'redux';
import { drawerReducer, dashboardsReducer } from './reducers';
import { reducer as reduxFormReducer } from 'redux-form';

const reducers = combineReducers({
	drawer: drawerReducer,
	dashboards: dashboardsReducer,

	form: reduxFormReducer,
});

const store = createStore(reducers);

export default store;
