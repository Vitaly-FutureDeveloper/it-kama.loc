import {GetItemsType, instance, ResponseType} from "./api";


export const usersAPI = {
	getUsers (currentPage:number=1, pageSize:number=0, term:string="") {
		return instance.get<GetItemsType>(`/users?page=${currentPage}&count=${pageSize}&term=${term}`)
			.then(response => response.data);
	},
	follow(userId:number){
		return instance.post<ResponseType>(`/follow/${userId}`).then(response => response.data);
	},
	unfollow(userId:number){
		return instance.delete(`/follow/${userId}`).then(response => response.data) as Promise<ResponseType>;
	},
};