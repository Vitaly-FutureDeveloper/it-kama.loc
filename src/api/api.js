import * as axios from "axios";

const BASE_URL = "https://social-network.samuraijs.com/api/1.0";
const API_KEY = "bbd368cb-cbd4-49df-b254-fdd056ac38e7";

const instance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
	headers: {
		"API-KEY": API_KEY
	}
});

export const usersAPI = {
	getUsers (currentPage=1, pageSize=0) {
		return instance.get(`/users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data);
	},
	follow(userId){
		return instance.post(`/follow/${userId}`);
	},
	unfollow(userId){
		return instance.delete(`/follow/${userId}`);
	},
};

export const profileAPI = {
	getProfile(userId=2){
		return instance.get(`/profile/${userId}`)
	},
	getStatus(userId){
		return instance.get(`profile/status/${userId}`)
	},
	updateStatus(status){
		return instance.put(`profile/status`, {
			status
		});
	},
	savePhoto(photoFile){
		const formData = new FormData();
		formData.append("image", photoFile);

		return instance.put(`profile/photo`, formData, {
			headers: {'Content-Type': 'multipart/form-data'}
		});
	},

	saveProfile(profile){
		return instance.put(`profile`, profile);
	},
};

export const authAPI = {
	me(){
		return instance.get(`/auth/me`);
	},
	login(email, password, rememberMe=false){
		const body = {
			email,
			password,
			rememberMe,
		};
		return instance.post(`/auth/login`, body);
	},
	logout(){
		return instance.delete(`/auth/login`);
	}
};
