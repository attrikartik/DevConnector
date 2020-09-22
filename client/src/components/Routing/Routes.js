import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Alert from "../Allert/Alert";
import Dashboard from "../Dashboard/Dashboard";
import AddExperience from "../ProfileForm/AddExperience";
import AddEducation from "../ProfileForm/AddEducation";
import EditProfile from "../ProfileForm/EditProfile";
import CreateProfile from "../ProfileForm/CreateProfile";
import Profiles from "../Profiles/Profiles";
import Profile from "../Profile/Profile";
import Posts from "../Posts/Posts";
import Post from "../Post/Post";
import NotFound from "../Layout/NotFound";
import PrivateRoute from "./PrivateRoute";

const Routes = (props) => {
	return (
		<section className="container">
			<Alert />
			<Switch>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/profiles" component={Profiles} />
				<Route exact path="/profile/:id" component={Profile} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
				<PrivateRoute exact path="/edit-profile" component={EditProfile} />
				<PrivateRoute exact path="/create-profile" component={CreateProfile} />
				<PrivateRoute exact path="/add-experience" component={AddExperience} />
				<PrivateRoute exact path="/add-education" component={AddEducation} />
				<PrivateRoute exact path="/posts" component={Posts} />
				<PrivateRoute exact path="/posts/:id" component={Post} />
				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;
