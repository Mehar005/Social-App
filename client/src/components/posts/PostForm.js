import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../redux/actions/postActions';

const PostForm = () => {
	let [state, setState] = useState({
		text: '',
	});
	const dispatch = useDispatch();
	const { errors } = useSelector((state) => state);
	const { user } = useSelector((state) => state.auth);

	const onSubmit = (e) => {
		e.preventDefault();

		const newPost = {
			text: state.text,
			name: user.username,
			avatar: user.avatar,
		};

		dispatch(addPost(newPost));
		setState({ ...state, text: '' });
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		state[name] = value;
		setState({ ...state });
	};

	return (
		<div className="post-form mb-3">
			<div className="card card-info">
				<div className="card-header bg-info text-white">Say Somthing...</div>
				<div className="card-body">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<TextAreaFieldGroup
								placeholder="Create a post"
								name="text"
								value={state.text}
								onChange={onChange}
								error={errors.text}
							/>
						</div>
						<button type="submit" className="btn btn-dark">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PostForm;
