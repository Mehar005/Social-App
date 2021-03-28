import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

const Signup = (props) => {
	// Initial state of the component
	let [state, setState] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	// Pulling out the errors and auth object from redux store using useSelector hook
	const errors = useSelector((state) => state.errors);
	const auth = useSelector((state) => state.auth);
	useEffect(() => {
		return () =>
			dispatch({
				type: 'GET_ERRORS',
				payload: {},
			});
	}, []);

	useEffect(() => {
		if (auth.isAuthenticated) {
			props.history.push('/dashboard');
		}
	}, [auth, props.history]);

	const dispatch = useDispatch();

	// This function will handle the input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		state[name] = value;
		setState({ ...state });
	};
	// This function will handle the form submisson
	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {
			username: state.name,
			email: state.email,
			password: state.password,
			password2: state.password2,
		};

		dispatch(registerUser(user, props.history));
	};

	return (
		<div className="register">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Sign Up</h1>
						<p className="lead text-center">Create your DevConnector account</p>
						<form noValidate onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									type="text"
									className={classnames('form-control', {
										'is-invalid': errors.username,
									})}
									placeholder="Name"
									name="name"
									value={state.name}
									onChange={handleChange}
								/>
								{errors.username ? (
									<div className="invalid-feedback">{errors.username}</div>
								) : null}
							</div>
							<div className="form-group">
								<input
									type="email"
									className={classnames('form-control', {
										'is-invalid': errors.email,
									})}
									placeholder="Email Address"
									name="email"
									value={state.email}
									onChange={handleChange}
								/>
								{errors.email ? (
									<div className="invalid-feedback">{errors.email}</div>
								) : null}
								<small className="form-text text-muted">
									This site uses Gravatar so if you want a profile image, use a
									Gravatar email
								</small>
							</div>
							<div className="form-group">
								<input
									type="password"
									className={classnames('form-control', {
										'is-invalid': errors.password,
									})}
									placeholder="Password"
									name="password"
									value={state.password}
									onChange={handleChange}
								/>
								{errors.password ? (
									<div className="invalid-feedback">{errors.password}</div>
								) : null}
							</div>
							<div className="form-group">
								<input
									type="password"
									className={classnames('form-control', {
										'is-invalid': errors.password2,
									})}
									placeholder="Confirm Password"
									name="password2"
									value={state.password2}
									onChange={handleChange}
								/>
								{errors.password2 ? (
									<div className="invalid-feedback">{errors.password2}</div>
								) : null}
							</div>
							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Signup);
