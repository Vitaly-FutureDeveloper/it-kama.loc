const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-BODY";


const initialState = {
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
};

const dialogsReducer = (state=initialState, action) => {
	switch (action.type){
		case ADD_MESSAGE:
			const newPost = {
				id: 5,
				name: state.newMessageBody,
			};
			state.messages.push(newPost);
			state.newMessageBody = '';

			return state;

		case UPDATE_NEW_MESSAGE_TEXT:
			state.newMessageBody = action.newText;
			return state;

		default:
			return state;
	}

};


export const addMessageCreator = () => ({ type: ADD_MESSAGE });
export const updateNewMessageBodyCreator = (text) => ({
	type: UPDATE_NEW_MESSAGE_TEXT,
	newText: text
});

export default dialogsReducer;