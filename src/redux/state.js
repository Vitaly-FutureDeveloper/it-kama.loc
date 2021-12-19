import {rerenderEntireTree} from "../render";

const state = {

	profilePage: {
		posts : [
			{id: "1", message: "How are you?", likeCount: "15"},
			{id: "2", message: "Хаваю, хаваю!", likeCount: "15"},
			{id: "3", message: "It's my first post", likeCount: "55"},
		],
		newPostText: 'it-kama',
	},

	dialogsPage :{
		dialogs : [
			{id: "1", name: "Dima",},
			{id: "2", name: "Lesha",},
			{id: "3", name: "Masha",},
			{id: "4", name: "Lena",},
			{id: "5", name: "Pasha",},
			{id: "6", name: "Dasha",},
		],
		messages : [
			{id: "1", name: "How are you?",},
			{id: "2", name: "Yuo mmen",},
			{id: "3", name: "Hi",},
		],
		newMessageText: 'it-kama',
	},

	sidebar : {
		friends : [
			{id: 1, name: "Саня",},
			{id: 2, name: "Алекс",},
			{id: 3, name: "Шурик",},
			{id: 4, name: "Шарик",},
		],
	},
};

export const addPost = () => {
	const newPost = {
		id: 5,
		message: state.profilePage.newPostText,
		likesCount: 0,
	};
	state.profilePage.posts.unshift(newPost);
	state.profilePage.newPostText = '';
	rerenderEntireTree(state);
};

export const addMessage = () => {
	const newPost = {
		id: 5,
		name: state.dialogsPage.newMessageText,
	};
	state.dialogsPage.messages.push(newPost);
	state.dialogsPage.newMessageText = '';
	rerenderEntireTree(state);
};

export const updateNewMessageChange = (newText) => {
	state.dialogsPage.newMessageText = newText;
	rerenderEntireTree(state);
};

export const updateNewPostChange = (newText) => {
	state.profilePage.newPostText = newText;
	rerenderEntireTree(state);
};

export default state;