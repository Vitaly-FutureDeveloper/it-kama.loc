import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

const initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
};

const authReducer = (state=initialState, action) => {

	switch (action.type){
		case SET_USER_DATA: {
			return {
				...state,
				...action.payload
			};
		}


		default:
			return state;
	}

};


export const setAuthUserData = (userId, email, login, isAuth) => ({
	type: SET_USER_DATA,
	payload: {
		userId,
		email,
		login,
		isAuth,
	}
});

export const getAuthUserData = () => {
	return (dispatch) => {
		return authAPI.me().then((response) => {
			if (response.data.resultCode === 0){
				const {id, email, login} = response.data.data;
				dispatch(setAuthUserData(id, email, login, true));
			}
		});
	}
};

export const login = (email, password, rememberMe) => {
	return (dispatch) => {
		authAPI.login(email, password, rememberMe).then((response) => {
			if (response.data.resultCode === 0){
				// После логинизации диспатчим САНКу
				// Которая проверяет: залогинины ли мы
				dispatch(getAuthUserData());
			} else {
				// stopSubmit - для обработки ошибок
				const message = response.data.messages.length > 0 ? response.data.messages[0] : "какая-то ошибка";
				const action = stopSubmit("login", {_error: message});

				dispatch(action);
			}
		});
	}
};

export const logout = () => {
	return (dispatch) => {
		authAPI.logout().then((response) => {
			if (response.data.resultCode === 0){
				// После логинизации диспатчим САНКу
				// Которая проверяет: залогинины ли мы
				dispatch(setAuthUserData(null, null, null, true));
			}
		});
	}
};


export default authReducer;