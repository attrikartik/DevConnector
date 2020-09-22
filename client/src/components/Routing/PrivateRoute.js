import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!isAuthenticated && !loading ? (
				<Redirect to="/login" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

/** props validation */
PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

/** getting state from redux store */
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
