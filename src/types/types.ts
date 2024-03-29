import {AppStateType} from "../redux/redux-store";
import {Dispatch} from "redux";

export type PostType = {
	id:number,
	message:string,
	likeCount:number,
};
export type ContactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
};
export type PhotosType = {
	small: string,
	large: string,
};
export type ProfileType = {
	userId:number,
	lookingForAJob:boolean,
	lookingForAJobDescription:string,
	fullName:string,
	status:string,
	contacts:ContactsType,
	photos: PhotosType,
	aboutMe: string,
};
export type UsersType = {
	id:number,
	name:string,
	status:string,
	photos:PhotosType,
	followed:boolean,
};
