import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../store/actions/Profile";
import PropTypes from "prop-types";
import Spinner from "../Layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { deleteAccount } from "../../store/actions/Profile";

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
	deleteAccount,
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p>
				<i className="fas.fa-user"></i>Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className="my-2">
						<button className="btn btn-danger" onClick={() => deleteAccount()}>
							<i className="fas.fa-user-minus"></i>Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not set your profile, please add some details</p>
					<Link to="create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

/** props validation */
Dashboard.propsTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.bool.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
};

/** getting state from redux store */
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
