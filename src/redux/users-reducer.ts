import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/UsersAPI";

import {updateObjectInArray} from "../utils/object-helper";
import {UsersType} from "../types/types";
import {ResponseType} from "../api/api";


export const initialState = {
	users : [] as Array<UsersType>,
	pageSize: 50,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number>, // array of users ids
	filter: {
		term: "",
		friend: null as null | boolean,
	},
};

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

const usersReducer = (state=initialState, action:ActionsTypes):InitialStateType => {
	switch (action.type) {

		case "SN/USERS/FOLLOW":
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
			};

		case "SN/USERS/UNFOLLOW":
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
			};

		case "SN/USERS/SET_USERS":
			return {...state, users: [...action.users]};

		case "SN/USERS/SET_CURRENT_PAGE":
			return {...state, currentPage: action.currentPage};

		case "SN/USERS/SET_FILTER":
			return {...state, filter: action.payload}

		case "SN/USERS/SET_TOTAL_USERS_COUNT":
			return {...state, totalUsersCount: action.count};

		case "SN/USERS/TOGGLE_IS_FETCHING":
			return {...state, isFetching: action.isFetching};

		case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
			return {
				...state,
				followingInProgress: action.isFetching ?
					[...state.followingInProgress, action.userId]
						:
					state.followingInProgress.filter(id => id != action.userId),
			};


		default: {
			return state;
		}

	}

};


export const actions = {
	followSuccess: (userId:number) => ({ type: 'SN/USERS/FOLLOW', userId} as const),
	unfollowSuccess: (userId:number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
	setUsers: (users:Array<UsersType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
	setCurrentPage: (currentPage:number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
	setFilter: (filter:FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter } as const),
	setTotalUsersCount: (totalUsersCount:number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
	toggleIsFetching: (isFetching:boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching  } as const),
	togglefollowingProgress: (isFetching:boolean, userId:number) => ({
		type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
		isFetching,
		userId,
	} as const),
};

export type DispatchType = Dispatch<ActionsTypes>;



export const getUsersThunkCreator = (currentPage:number, pageSize:number, filter:FilterType):ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleIsFetching(true));
		dispatch(actions.setCurrentPage(currentPage));
		dispatch(actions.setFilter(filter));

		const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);

		dispatch(actions.setUsers(data.items));
		dispatch(actions.setTotalUsersCount(data.totalCount));
		dispatch(actions.toggleIsFetching(false));
	}
};

const _followUnfollowToggle = async ( dispatch:DispatchType,
																		 userId:number,
																		 apiMethod: (userId:number) => Promise<ResponseType>,
																		 actionCreator: (userID:number) => ActionsTypes ) => {
	dispatch(actions.togglefollowingProgress(true, userId));

	const data = await apiMethod(userId);

	if (data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(actions.togglefollowingProgress(false, userId));
};

export const follow = (userId:number):ThunkType => {
	return async (dispatch) => {
		const apiMethod = usersAPI.follow.bind(usersAPI);

		await _followUnfollowToggle(dispatch, userId, apiMethod, actions.followSuccess);
	}
};

export const unfollow = (userId:number):ThunkType => {
	return async (dispatch) => {
		const apiMethod = usersAPI.unfollow.bind(usersAPI);

		await _followUnfollowToggle(dispatch, userId, apiMethod, actions.unfollowSuccess);
	}
};

export default usersReducer;