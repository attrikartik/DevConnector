import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	DELETE_ACCOUNT,
} from "../actions/Types";

import { updateState } from "./utils";

const initalState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};

const userLoaded = (state, payload) => {
	return updateState(state, {
		isAuthenticated: true,
		loading: false,
		user: payload,
	});
};

const authenticateSuccess = (state, payload) => {
	localStorage.setItem("token", payload.token);
	return updateState(state, {
		...state,
		...payload,
		isAuthenticated: true,
		loading: false,
	});
};

const authenticateFail = (state, payload) => {
	localStorage.removeItem("token");
	return updateState(state, {
		...state,
		token: null,
		isAuthenticated: false,
		loading: false,
	});
};

const auth = (state = initalState, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return userLoaded(state, payload);

		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return authenticateSuccess(state, payload);

		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case DELETE_ACCOUNT:
			return authenticateFail(state, payload);

		default:
			return state;
	}
};

export default auth;
