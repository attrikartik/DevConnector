import axios from "axios";
import { setAlert } from "../actions/Alert";
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	DELETE_ACCOUNT,
	GET_PROFILES,
	GET_REPOS,
} from "./Types";

// GET current user

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// get all profiles
export const getProfiles = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile");
		dispatch({ type: CLEAR_PROFILE });
		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// get all profile by id
export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// get all github repos
export const getGithubRepos = (userName) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/github/${userName}`);
		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// create / update profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.post("/api/profile", formData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
		history.push("/dashboard");
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// add experience

export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.put("/api/profile/experience", formData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data.profile,
		});
		dispatch(setAlert("Experience Added", "success"));
		history.push("/dashboard");
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// add education

export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.put("/api/profile/education", formData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data.profile,
		});
		dispatch(setAlert("Education Added", "success"));
		history.push("/dashboard");
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach((err) => {
				dispatch(setAlert(err.msg, "danger"));
			});
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// delete experience

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data.profile,
		});
		dispatch(setAlert("Experience Deleted", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// delete education

export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data.profile,
		});
		dispatch(setAlert("Education Deleted", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

// delete account & profile

export const deleteAccount = () => async (dispatch) => {
	if (window.confirm("Are you sure? This cannot be undone!")) {
		try {
			await axios.delete("/api/profile/");
			dispatch({
				type: CLEAR_PROFILE,
			});
			dispatch({
				type: DELETE_ACCOUNT,
			});
			dispatch(setAlert("Account Deleted", "success"));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status,
				},
			});
		}
	}
};
