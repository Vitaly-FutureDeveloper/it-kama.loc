import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";


const store = {
	_state : {

		profilePage: {
			posts : [
				{id: "1", message: "How are you?", likeCount: "15"},
				{id: "2", message: "Хаваю, хаваю!", likeCount: "15"},
				{id: "3", message: "It's my first post", likeCount: "55"},
			],
			newPostText: 'it-kama',
		},

		dialogsPage : {
			dialogs: [
				{id: "1", name: "Dima",},
				{id: "2", name: "Lesha",},
				{id: "3", name: "Masha",},
				{id: "4", name: "Lena",},
				{id: "5", name: "Pasha",},
				{id: "6", name: "Dasha",},
			],
			messages: [
				{id: "1", name: "How are you?",},
				{id: "2", name: "Yuo mmen",},
				{id: "3", name: "Hi",},
			],
			newMessageBody: 'it-kama',
		},

		sidebar : {
			friends : [
				{id: 1, name: "Саня",},
				{id: 2, name: "Алекс",},
				{id: 3, name: "Шурик",},
				{id: 4, name: "Шарик",},
			],
		},
	},
	_callSubscriber ()  {
		console.log("'State changed");
	},

	getState(){
		return this._state;
	},

	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch(action) {
		// {
		// 	type: '',
		// 	newText: '',
		// }

		profileReducer(this._state.profilePage, action);
		dialogsReducer(this._state.dialogsPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);

		this._callSubscriber(this._state);

	}


};




export default store;
window.store = store;