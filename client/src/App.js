import './App.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from './redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import { clearCurrentProfile } from './redux/actions/profileActions';
import { Route, Switch } from 'react-router-dom';

// components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/createProfile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import PrivateRoute from './components/common/PrivateRoute';
import Profiles from './components/all-profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
if (localStorage.jwt) {
	// set auth header
	axios.defaults.headers.common['Authorization'] = localStorage.jwt;
	// decode the token
	const decoded = jwt_decode(localStorage.jwt);
	// set current user
	store.dispatch(setCurrentUser(decoded));
	// clear the current profile
	store.dispatch(clearCurrentProfile());
	// check for if token expires
	const currentTime = Date.now() / 1000;
	console.log(decoded.exp < currentTime);
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
}

function App() {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/profiles" component={Profiles} />
				<Route exact path="/profile/:handle" component={Profile} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
				<PrivateRoute exact path="/create-profile" component={CreateProfile} />
				<PrivateRoute exact path="/edit-profile" component={EditProfile} />
				<PrivateRoute exact path="/add-experience" component={AddExperience} />
				<PrivateRoute exact path="/add-education" component={AddEducation} />
				<PrivateRoute exact path="/feed" component={Posts} />
				<PrivateRoute exact path="/post/:id" component={Post} />
				<Route exact path="/not-found" component={NotFound} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
