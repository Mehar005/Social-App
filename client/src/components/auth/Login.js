import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import classnames from 'classnames';

const Login = (props) => {
	let [state, setState] = useState({
		email: '',
		password: '',
	});

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const errors = useSelector((state) => state.errors);

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

	// fucntion to handle the change of input
	const handleChange = (e) => {
		const { name, value } = e.target;
		state[name] = value;
		setState({ ...state });
	};

	// function to handle the submission of form
	const handleSubmit = (e) => {
		e.preventDefault();
		const user = {
			email: state.email,
			password: state.password,
		};
		dispatch(loginUser(user));
	};

	return (
		<div className="login">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Log In</h1>
						<p className="lead text-center">
							Sign in to your DevConnector account
						</p>
						<form noValidate onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									type="email"
									className={classnames('form-control form-control-lg', {
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
							</div>
							<div className="form-group">
								<input
									type="password"
									className={classnames('form-control form-control-lg', {
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
							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
