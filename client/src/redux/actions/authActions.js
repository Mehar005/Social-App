import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => (dispatch) => {
	// sending data through API
	axios
		.post('http://localhost:5000/api/users/register', userData)
		.then(() => history.push('/login'))
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

export const loginUser = (userData) => (dispatch) => {
	// Send req to back-end with user data
	axios
		.post('http://localhost:5000/api/users/login', userData)
		.then((res) => {
			// get token from the response
			const { token } = res.data;
			// save token to local storage
			localStorage.setItem('jwt', token);
			// set token to auth header
			if (token) {
				axios.defaults.headers.common['Authorization'] = token;
			} else {
				delete axios.defaults.headers.common['Authorization'];
			}
			//decode token
			const decoded = jwt_decode(token);
			// dispatch decoded data to auth reducer
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			});
		});
};

export const logoutUser = () => (dispatch) => {
	// remove token from the local storage
	localStorage.removeItem('jwt');
	// delete auth header
	delete axios.defaults.headers.common['Authrization'];
	// remove current user and set is Authenticated to false
	dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded) => {
	return {
		type: 'SET_CURRENT_USER',
		payload: decoded,
	};
};
