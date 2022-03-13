import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

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
				posts: state.posts.filter(p => p.id != action.postId)
			}
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


export const addPostCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const setUsersProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({
	type: SET_STATUS,
	status,
});

export const getProfile = (userId) => async (dispatch) => {
	const response = await profileAPI.getProfile(userId);

	dispatch(setUsersProfile(response.data));
};

export const getStatus = (status) => async (dispatch) => {
	const response = await profileAPI.getStatus(status);

	dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);

	if (response.data.resultCode === 0)
		dispatch(setStatus(status));
};

export default profileReducer;