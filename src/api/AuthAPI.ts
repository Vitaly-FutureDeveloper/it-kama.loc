import {instance, ResponseType, ResultCodesEnum} from "./api";

type MeResponseDataType = {
	id:number,
	email:string,
	login:string
};

type LoginResponseDataType = {
	userId:number,
};

export const authAPI = {
	me(){
		return instance.get<ResponseType<MeResponseDataType>>(`/auth/me`).then(response => response.data);
	},
	login(email:string, password:string, rememberMe=false, captcha:null|string=null){
		const body = {
			email,
			password,
			rememberMe,
			captcha,
		};
		return instance.post<ResponseType<LoginResponseDataType>>(`/auth/login`, body).then(response => response.data);
	},
	logout(){
		return instance.delete(`/auth/login`).then(response => response.data);
	}
};