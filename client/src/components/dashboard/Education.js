import React from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../redux/actions/profileActions';

const Experience = ({ education }) => {
	const dispatch = useDispatch();
	const onDeleteClick = (id) => {
		dispatch(deleteEducation(id));
	};

	const edu = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td>{edu.degree}</td>
			<td>
				<Moment format="YYYY/MM/DD">{edu.from}</Moment> -
				{edu.to === null ? (
					' Now'
				) : (
					<Moment format="YYYY/MM/DD">{edu.to}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => onDeleteClick(edu._id)}
					className="btn btn-danger"
				>
					Delete
				</button>
			</td>
		</tr>
	));
	return (
		<div>
			<h4 className="mb-4">Experience Credentials</h4>
			<table className="table">
				<thead>
					<tr>
						<th>Institute</th>
						<th>Degree</th>
						<th>Years</th>
						<th />
					</tr>
					{edu}
				</thead>
			</table>
		</div>
	);
};

export default Experience;
