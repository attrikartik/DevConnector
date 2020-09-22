import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/Auth";
import PropTypes from "prop-types";

const Navbar = ({ logout, isAuthenticated, loading }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user"></i>{" "}
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link onClick={logout} to="/login">
					<span className="hide-sm">Logout</span>
				</Link>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);
	return (
		<div>
			<nav className="navbar bg-dark">
				<h1>
					<Link to="/dashboard">
						<i className="fas fa-code"></i> DevConnector
					</Link>
				</h1>
				{!loading && (
					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
				)}
			</nav>
		</div>
	);
};

/**props validation */
Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

/** getting state from redux store */
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(Navbar);
