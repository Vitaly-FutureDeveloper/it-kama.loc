import {act} from "@testing-library/react";
import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

const initialState = {
	posts : [
		{id: "1", message: "How are you?", likeCount: "15"},
		{id: "2", message: "Хаваю, хаваю!", likeCount: "15"},
		{id: "3", message: "It's my first post", likeCount: "55"},
	],
	newPostText: 'it-kama',
	profile: null,
	status: "",
};


const profileReducer = (state=initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			const newPost = {
				id: 5,
				message: state.newPostText,
				likesCount: 0,
			};

			return {
				...state,
				posts : [newPost, ...state.posts],
				newPostText : '',
			};
		}
		case
			UPDATE_NEW_POST_TEXT:{
				return {
					...state,
					newPostText : action.newText,
				};
			}
		case SET_USER_PROFILE:
			return {...state, profile: action.profile}

		case SET_STATUS:
			return {...state, status: action.status}

		default: {
			return state;
		}

	}

};


export const addPostCreator = () => ({ type: ADD_POST });
export const setUsersProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const updateNewPostTextCreator = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text
});
export const setStatus = (status) => ({
	type: SET_STATUS,
	status,
});

export const getProfile = (userId) => {
	return (dispatch) => {
		profileAPI.getProfile(userId).then((response) => {
			dispatch(setUsersProfile(response.data));
		});
	}
};

export const getStatus = (status) => {
	return (dispatch) => {
		profileAPI.getStatus(status).then((response) => {
			dispatch(setStatus(response.data));
		});
	}
};

export const updateStatus = (status) => {
	return (dispatch) => {
		profileAPI.updateStatus(status).then((response) => {
			if (response.data.resultCode === 0)
			dispatch(setStatus(status));
		});
	}
};

export default profileReducer;