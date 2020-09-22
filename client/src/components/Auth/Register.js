import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../store/actions/Alert";
import { register } from "../../store/actions/Auth";

import PropTypes from "prop-types";

const initialState = {
	name: "",
	email: "",
	password: "",
	password2: "",
	profilePicture: "",
};
const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState(initialState);
	const { name, email, password, password2, profilePicture } = formData;

	/** user input handler */
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	/** uploading file (profile picture) to cloudinary */
	const onFileChange = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "sickfits");

		const res = await fetch(
			"https://api.cloudinary.com/v1_1/dwhxgzjuq/image/upload",
			{
				method: "POST",
				body: data,
			}
		);
		const file = await res.json();
		setFormData({ ...formData, profilePicture: file.secure_url });
	};

	/** on form submit */
	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Password dont match", "danger");
		} else {
			register({ name, email, password, profilePicture });
		}
	};

	// redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>

					<p className="my-1">
						<i className="far fa-user-circle"></i>
						{" Select Profile Picture"}
					</p>
					<div className="form-group">
						<input
							type="file"
							name="profilePicture"
							placeholder="Profile Picture"
							onChange={(e) => onFileChange(e)}
							required
						/>
					</div>
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
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						value={password2}
						onChange={(e) => onChange(e)}
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</Fragment>
	);
};

/** props validation */
Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
export default connect(null, { setAlert, register })(Register);
