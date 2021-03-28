import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../redux/actions/postActions';

const CommentForm = (props) => {
	let [state, setState] = useState({
		text: '',
		errors: {},
	});

	const { errors } = useSelector((state) => state);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		setState({ ...state, errors: errors });
	}, [errors]);

	// componentWillReceiveProps(newProps) {
	// 	if (newProps.errors) {
	// 		this.setState({ errors: newProps.errors });
	// 	}
	// }

	const onSubmit = (e) => {
		e.preventDefault();

		const { postId } = props;

		const newComment = {
			text: state.text,
			name: user.username,
			avatar: user.avatar,
		};

		dispatch(addComment(postId, newComment));
		setState({ text: '' });
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		state[name] = value;
		setState({ ...state });
	};

	return (
		<div className="post-form mb-3">
			<div className="card card-info">
				<div className="card-header bg-info text-white">Make a comment...</div>
				<div className="card-body">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<TextAreaFieldGroup
								placeholder="Reply to post"
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

export default CommentForm;
