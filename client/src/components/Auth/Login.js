import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/actions/Auth";
import PropTypes from "prop-types";

const initialState = {
	email: "",
	password: "",
};

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState(initialState);
	const { email, password } = formData;

	/** user input handler  */
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	/** on form submit */
	const onSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	// redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign Into Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</Fragment>
	);
};

/** getting state from redux store */
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

/** props validation */
Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
export default connect(mapStateToProps, { login })(Login);
