import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai/auth/GET_CAPTCHA_URL_SUCCESS";

const initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null, // if null, then captcha is not required
};

const authReducer = (state=initialState, action) => {

	switch (action.type){
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS : {
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

export const getCaptchaUrlSuccess = (captchaUrl) => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: {captchaUrl},
});


export const getAuthUserData = () =>  async (dispatch) => {
	const response = await authAPI.me();

	if (response.data.resultCode === 0){
		const {id, email, login} = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	const response = await authAPI.login(email, password, rememberMe, captcha);

	if (response.data.resultCode === 0){
		// После логинизации диспатчим САНКу
		// Которая проверяет: залогинины ли мы
		dispatch(getAuthUserData());
	}  else {

		if (response.data.resultCode === 10) {
			dispatch( getCaptchaUrl() );
		}

		// stopSubmit - для обработки ошибок
		const message = response.data.messages.length > 0 ? response.data.messages[0] : "какая-то ошибка";
		const action = stopSubmit("login", {_error: message});

		dispatch(action);
	}
};

export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityAPI.getCaptchaUrl();
	const captcaUrl = response.data.url;

	dispatch( getCaptchaUrlSuccess(captcaUrl) );

};

export const logout = () => async (dispatch) => {
	const response = await authAPI.logout();

	if (response.data.resultCode === 0){
		// После логинизации диспатчим САНКу
		// Которая проверяет: залогинины ли мы
		dispatch(setAuthUserData(null, null, null, true));
	}
};


export default authReducer;