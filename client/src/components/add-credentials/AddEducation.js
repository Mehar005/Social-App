import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { useDispatch, useSelector } from 'react-redux';

import { addEducation } from '../../redux/actions/profileActions';

const AddEducation = (props) => {
	// component initial state
	let [state, setState] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
		errors: {},
		disabled: false,
	});
	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();

		const eduData = {
			school: state.school,
			degree: state.degree,
			fieldofstudy: state.fieldofstudy,
			from: state.from,
			to: state.to,
			current: state.current,
			description: state.description,
		};

		dispatch(addEducation(eduData, props.history));
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		state[name] = value;
		setState({ ...state });
	};

	const onCheck = (e) => {
		setState({
			...state,
			disabled: !state.disabled,
			current: !state.current,
		});
	};
	// pull out error object from redux store
	const { errors } = useSelector((state) => state);

	useEffect(() => {
		return () =>
			dispatch({
				type: 'GET_ERRORS',
				payload: {},
			});
	}, []);

	return (
		<div className="add-education">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-light">
							Go Back
						</Link>
						<h1 className="display-4 text-center">Add Education</h1>
						<p className="lead text-center">
							Add any school, bootcamp, etc that you have attended
						</p>
						<small className="d-block pb-3">* = required fields</small>
						<form onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="* School"
								name="school"
								value={state.school}
								onChange={onChange}
								error={errors.school}
							/>
							<TextFieldGroup
								placeholder="* Degree or Certification"
								name="degree"
								value={state.degree}
								onChange={onChange}
								error={errors.degree}
							/>
							<TextFieldGroup
								placeholder="* Field of Study"
								name="fieldofstudy"
								value={state.fieldofstudy}
								onChange={onChange}
								error={errors.fieldofstudy}
							/>
							<h6>From Date</h6>
							<TextFieldGroup
								name="from"
								type="date"
								value={state.from}
								onChange={onChange}
								error={errors.from}
							/>
							<h6>To Date</h6>
							<TextFieldGroup
								name="to"
								type="date"
								value={state.to}
								onChange={onChange}
								error={errors.to}
								disabled={state.disabled ? 'disabled' : ''}
							/>
							<div className="form-check mb-4">
								<input
									type="checkbox"
									className="form-check-input"
									name="current"
									value={state.current}
									checked={state.current}
									onChange={onCheck}
									id="current"
								/>
								<label htmlFor="current" className="form-check-label">
									Current Job
								</label>
							</div>
							<TextAreaFieldGroup
								placeholder="Program Description"
								name="description"
								value={state.description}
								onChange={onChange}
								error={errors.description}
								info="Tell us about the program that you were in"
							/>
							<input
								type="submit"
								value="Submit"
								className="btn btn-info btn-block mt-4"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(AddEducation);
