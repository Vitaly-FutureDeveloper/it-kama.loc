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
	}
};

export const authAPI = {
	me(){
		return instance.get(`/auth/me`);
	},
};
