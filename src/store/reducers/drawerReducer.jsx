const initialState = {
	open: true,
};

const reducer = (state = initialState, action) => {
  	switch (action.type) {
		case CHANGE_DRAWER_VISIBILITY:
			console.log("CHANGE_DRAWER_VISIBILITY");
			return { ...state, open: action.open };
		default:
			return state;
  	}
}

export const CHANGE_DRAWER_VISIBILITY = 'CHANGE_DRAWER_VISIBILITY';

export default reducer;
