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
	}
}
