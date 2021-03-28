import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../redux/actions/profileActions';

const Profile = (props) => {
	const dispatch = useDispatch();
	const { profile, loading } = useSelector((state) => state.profile);
	const { errors } = useSelector((state) => state);

	useEffect(() => {
		if (props.match.params.handle) {
			dispatch(getProfileByHandle(props.match.params.handle));
		}
		return () =>
			dispatch({
				type: 'GET_PROFILE',
				payload: null,
			});
	}, []);

	useEffect(() => {
		if (Object.keys(errors).length !== 0) {
			props.history.push('/not-found');
		}

		return () =>
			dispatch({
				type: 'CLEAR_ERRORS',
			});
	}, [errors]);

	let profileContent;
	if (profile === null || loading) {
		profileContent = <Spinner />;
	} else {
		profileContent = (
			<div>
				<div className="row">
					<div className="col-md-6">
						<Link to="/profiles" className="btn btn-light mb-3 float-left">
							Back To Profiles
						</Link>
					</div>
					<div className="col-md-6" />
				</div>
				<ProfileHeader profile={profile} />
				<ProfileAbout profile={profile} />
				<ProfileCreds
					experience={profile.experience}
					education={profile.education}
				/>
				{profile.githubusername ? (
					<ProfileGithub username={profile.githubusername} />
				) : null}
			</div>
		);
	}

	return (
		<div className="profile">
			<div className="container">
				<div className="row">
					<div className="col-md-12">{profileContent}</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
