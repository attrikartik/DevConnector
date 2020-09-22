import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getProfiles } from "../../store/actions/Profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"></i>Browse and connect with
						Developers
					</p>
					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>No Profiles Found</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

/** props validation */
Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

/** getting state from redux */
const mapStateToProps = (state) => ({
	profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
