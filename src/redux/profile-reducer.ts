import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {ProfileAPI} from "../api/ProfileAPI";
import {ResultCodesEnum} from "../api/api";


export const initialState = {
	posts : [
		{id: 1, message: "How are you?", likeCount: 15},
		{id: 2, message: "Хаваю, хаваю!", likeCount: 15},
		{id: 3, message: "It's my first post", likeCount: 55},
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: "",
};

export type InitialStateType = typeof initialState;

export type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

const profileReducer = (state=initialState, action:ActionsTypes):InitialStateType => {
	switch (action.type) {
		case "SN/PROFILE/ADD-POST": {
			const newPost = {
				id: 5,
				message: action.newPostText,
				likesCount: 0,
			};

			return {
				...state,
				posts : [newPost, ...state.posts] as Array<PostType>,
			};
		}

		case "SN/PROFILE/DELETE_POST": {
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			}
		}

		case "SN/PROFILE/SET_USER_PROFILE":
			return {...state, profile: action.profile}

		case "SN/PROFILE/SET_STATUS":
			return {...state, profile: {...state.profile, status: action.status} as ProfileType}

		case "SN/PROFILE/SET_PHOTO":
			return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}

		default: {
			return state;
		}
	}
};


export const actions = {
	addPostCreator : (newPostText:string) => ({ type: "SN/PROFILE/ADD-POST", newPostText } as const ),
	deletePost : (postId:number) => ({ type: "SN/PROFILE/DELETE_POST", postId } as const ),
	setUsersProfile : (profile:ProfileType) => ({ type: "SN/PROFILE/SET_USER_PROFILE", profile } as const ),
	setStatus : (status:string) => ({
		type: "SN/PROFILE/SET_STATUS",
		status,
	} as const ),
	savePhotoSuccess : (photos:PhotosType) => ({
		type: "SN/PROFILE/SET_PHOTO",
		photos,
	} as const ),
};



export const getProfile = (userId:number):ThunkType => async (dispatch) => {
	const data = await ProfileAPI.getProfile(userId);

	dispatch(actions.setUsersProfile(data));
};

export const getStatus = (status:number):ThunkType => async (dispatch) => {
	const data = await ProfileAPI.getStatus(status);

	dispatch(actions.setStatus(data));
};

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
	try {
		const data = await ProfileAPI.updateStatus(status);

		if (data.resultCode === ResultCodesEnum.Success) {
			dispatch(actions.setStatus(status));
		}
	} catch (e) {
		throw e
	}
};

export const savePhoto = (file:File):ThunkType => async (dispatch) => {
	const data = await ProfileAPI.savePhoto(file);

	if (data.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.savePhotoSuccess(data.data.photos));
	}
};

export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState) => {
	const userId:any = getState().auth.userId;
	const data = await ProfileAPI.saveProfile(profile);

	if (data.resultCode === ResultCodesEnum.Success) {

		if(userId !== null) {
			dispatch(actions.setUsersProfile(userId));
		}else {
			throw new Error('userId не может быть null');
		}

	} else {
		// stopSubmit - для обработки ошибок
		const message = data.messages.length > 0 ? data.messages[0] : "какая-то ошибка";
		const action = stopSubmit("edit-profile", {_error: message});

		dispatch(action);
		return Promise.reject(message);
	}
};

export default profileReducer;