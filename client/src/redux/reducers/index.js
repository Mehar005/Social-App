import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { profileReducer } from './profileReducer';
import { postReducer } from './postReducer';
const reducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer,
});

export default reducer;
