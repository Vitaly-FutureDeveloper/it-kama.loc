import axios from "axios";
import {UsersType} from "../types/types";

const BASE_URL = "https://social-network.samuraijs.com/api/1.0";
const API_KEY = "bbd368cb-cbd4-49df-b254-fdd056ac38e7";

export const instance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
	headers: {
		"API-KEY": API_KEY
	}
});



export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
	captchaErrorOccured = 10,
};


export type GetItemsType = {
	items: Array<UsersType>,
	totalCount:number,
	error: string | null
};

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
	data: D,
	messages:Array<string>,
	resultCode:RC,
};



