import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {securityAPI} from "../api/SecurityAPI";
import {ResultCodesEnum} from "../api/api";
import {authAPI} from "../api/AuthAPI";
import {stopSubmit} from "redux-form";


const initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null, // if null, then captcha is not required
};

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;

const authReducer = (state=initialState, action:ActionsTypes): InitialStateType => {

	switch (action.type){
		case "SN/auth/SET_USER_DATA":
		case "SN/auth/GET_CAPTCHA_URL_SUCCESS" : {
			return {
				...state,
				...action.payload
			};
		}

		default:
			return state;
	}
};


export const actions = {
	setAuthUserData : (userId:number | null, email:string | null, login:string | null, isAuth:boolean) => ({
		type: "SN/auth/SET_USER_DATA",
		payload: {
			userId,
			email,
			login,
			isAuth,
		}
	} as const),

	getCaptchaUrlSuccess : (captchaUrl: string) => ({
		type: "SN/auth/GET_CAPTCHA_URL_SUCCESS",
		payload: {captchaUrl},
	} as const),
};




export const getAuthUserData = ():ThunkType =>  async (dispatch) => {
	const meData = await authAPI.me();

	if (meData.resultCode === ResultCodesEnum.Success){
		const {id, email, login} = meData.data;
		dispatch(actions.setAuthUserData(id, email, login, true));
	}
};

export const login = (email:string,
											password:string,
											rememberMe:boolean,
											captcha:string):ThunkType => async (dispatch) => {

	const data = await authAPI.login(email, password, rememberMe, captcha);

	if (data.resultCode === ResultCodesEnum.Success){
		dispatch(getAuthUserData());

	} else {

		if (data.resultCode === ResultCodesEnum.captchaErrorOccured) {
			dispatch(getCaptchaUrl());
		}

		// stopSubmit - для обработки ошибок
		const message:string = data.messages.length > 0 ? data.messages[0] : "какая-то ошибка";
		const action:any = stopSubmit("login", {_error: message});

		dispatch(action);
	}
};

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
	const data = await securityAPI.getCaptchaUrl();

	dispatch( actions.getCaptchaUrlSuccess(data.url) );
};

export const logout = ():ThunkType => async (dispatch ) => {
	const data = await authAPI.logout();

	if (data.resultCode === ResultCodesEnum.Success){
		dispatch(actions.setAuthUserData(null, null, null, true));
	}
};


export default authReducer;