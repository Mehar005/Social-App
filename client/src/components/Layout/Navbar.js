import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { clearCurrentProfile } from '../../redux/actions/profileActions';
import { withRouter } from 'react-router-dom';

const Navbar = (props) => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	// function to logout user
	const clickToLogout = (e) => {
		e.preventDefault();
		dispatch(clearCurrentProfile());
		dispatch(logoutUser());
		props.history.push('/login');
	};

	const authLinks = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/feed">
					Post Feed
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/dashboard">
					Dashboard
				</Link>
			</li>
			<li className="nav-item">
				<a href="" className="nav-link" onClick={clickToLogout}>
					<img
						className="rounded-circle"
						style={{ width: '25px', marginRight: '5px' }}
						src={auth.user.avatar}
						alt={auth.user.username}
					/>
					Logout
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link className="nav-link" to="/signup">
					Sign Up
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/login">
					Login
				</Link>
			</li>
		</ul>
	);
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Social Dev
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#mobile-nav"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="mobile-nav">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/profiles">
								{' '}
								Developers
							</Link>
						</li>
					</ul>

					{auth.isAuthenticated ? authLinks : guestLinks}
				</div>
			</div>
		</nav>
	);
};

export default withRouter(Navbar);
