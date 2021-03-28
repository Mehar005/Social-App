import axios from 'axios';

// Add Post
export const addPost = (postData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post('http://localhost:5000/api/posts', postData)
		.then((res) =>
			dispatch({
				type: 'ADD_POST',
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

// Get Posts
export const getPosts = () => (dispatch) => {
	dispatch(setPostLoading());
	axios
		.get('http://localhost:5000/api/posts')
		.then((res) =>
			dispatch({
				type: 'GET_POSTS',
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: 'GET_POSTS',
				payload: null,
			})
		);
};

// Get Post
export const getPost = (id) => (dispatch) => {
	dispatch(setPostLoading());
	axios
		.get(`http://localhost:5000/api/posts/${id}`)
		.then((res) =>
			dispatch({
				type: 'GET_POST',
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: 'GET_POST',
				payload: null,
			})
		);
};

// Delete Post
export const deletePost = (id) => (dispatch) => {
	axios
		.delete(`http://localhost:5000/api/posts/${id}`)
		.then((res) =>
			dispatch({
				type: 'DELETE_POST',
				payload: id,
			})
		)
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

// Add Like
export const addLike = (id) => (dispatch) => {
	axios
		.post(`http://localhost:5000/api/posts/like/${id}`)
		.then((res) => dispatch(getPosts()))
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

// Remove Like
export const removeLike = (id) => (dispatch) => {
	axios
		.post(`http://localhost:5000/api/posts/unlike/${id}`)
		.then((res) => dispatch(getPosts()))
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

// Add Comment
export const addComment = (postId, commentData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post(`http://localhost:5000/api/posts/comment/${postId}`, commentData)
		.then((res) =>
			dispatch({
				type: 'GET_POST',
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

// Delete Comment
export const deleteComment = (postId, commentId) => (dispatch) => {
	axios
		.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)
		.then((res) =>
			dispatch({
				type: 'GET_POST',
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data,
			})
		);
};

// Set loading state
export const setPostLoading = () => {
	return {
		type: 'POST_LOADING',
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: 'CLEAR_ERRORS',
	};
};
