import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../store/actions/Profile";

const Profile = ({
	match,
	getProfileById,
	profile: { profile, laoding },
	auth,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);
	return (
		<Fragment>
			{profile === null || laoding ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-dark">
						Back
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to="/edit-profile" className="btn btn-dark">
								Edit Profile
							</Link>
						)}
					<div className="profile-grid my-1">
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className="profile-exp bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((experience) => {
										return (
											<ProfileExperience
												key={experience._id}
												experience={experience}
											/>
										);
									})}
								</Fragment>
							) : (
								<h4>No experience credentials</h4>
							)}
						</div>

						<div className="profile-edu bg-white p-2">
							<h2 className="text-primary">Education</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map((education) => (
										<ProfileEducation
											key={education._id}
											education={education}
										/>
									))}
								</Fragment>
							) : (
								<h4>No education credentials</h4>
							)}
						</div>

						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername} />
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

/** props validation */
Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

/** getting state from redux store */
const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
