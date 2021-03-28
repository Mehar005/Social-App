import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentProfile,
	deleteAccount,
} from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
	// hooks section
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);

	let { profile, loading } = useSelector((state) => state.profile);
	let { user } = useSelector((state) => state.auth);

	// callbacks
	const onDeleteClick = (e) => {
		dispatch(deleteAccount());
	};

	let dashboardContent;

	if (profile === null || loading) {
		dashboardContent = <Spinner />;
	} else {
		// Check if logged in user has profile data
		if (Object.keys(profile).length > 0) {
			dashboardContent = (
				<div>
					<p className="lead text-muted">
						Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
					</p>
					<ProfileActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div style={{ marginBottom: '60px' }} />
					<button onClick={onDeleteClick} className="btn btn-danger">
						Delete My Account
					</button>
				</div>
			);
		} else {
			// User is logged in but has no profile
			dashboardContent = (
				<div>
					<p className="lead text-muted">Welcome {user.username}</p>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-lg btn-info">
						Create Profile
					</Link>
				</div>
			);
		}
	}
	return (
		<div className="dashboard">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="display-4">Dashboard</h1>
						{dashboardContent}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
