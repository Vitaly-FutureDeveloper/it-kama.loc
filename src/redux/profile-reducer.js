import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_PHOTO = "SET_PHOTO";

const initialState = {
	posts : [
		{id: "1", message: "How are you?", likeCount: "15"},
		{id: "2", message: "Хаваю, хаваю!", likeCount: "15"},
		{id: "3", message: "It's my first post", likeCount: "55"},
	],
	profile: null,
	status: "",
};


const profileReducer = (state=initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			const newPost = {
				id: 5,
				message: action.newPostText,
				likesCount: 0,
			};

			return {
				...state,
				posts : [newPost, ...state.posts]
			};
		}

		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			}
		}

		case SET_USER_PROFILE:
			return {...state, profile: action.profile}

		case SET_STATUS:
			return {...state, profile: action.status}

		case SET_PHOTO:
			return {...state, profile: {...state.profile, photos: action.photos}}

		default: {
			return state;
		}

	}

};


export const addPostCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const setUsersProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({
	type: SET_STATUS,
	status,
});

export const savePhotoSuccess = (photos) => ({
	type: SET_PHOTO,
	photos,
});

export const getProfile = (userId) => async (dispatch) => {
	const response = await profileAPI.getProfile(userId);

	dispatch(setUsersProfile(response.data));
};

export const getStatus = (status) => async (dispatch) => {
	const response = await profileAPI.getStatus(status);
console.log(response.data);
	dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
	try {
		const response = await profileAPI.updateStatus(status);

		if (response.data.resultCode === 0) {
			dispatch(setStatus(status));
		}
	} catch (e) {
		throw e
	}
};

export const savePhoto = (file) => async (dispatch) => {
	const response = await profileAPI.savePhoto(file);

	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
};

export const saveProfile = (profile) => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	const response = await profileAPI.saveProfile(profile);

	if (response.data.resultCode === 0) {
		dispatch(setUsersProfile(userId));
	} else {
		// stopSubmit - для обработки ошибок
		const message = response.data.messages.length > 0 ? response.data.messages[0] : "какая-то ошибка";
		const action = stopSubmit("edit-profile", {_error: message});

		dispatch(action);
		return Promise.reject(message);
	}
};

export default profileReducer;