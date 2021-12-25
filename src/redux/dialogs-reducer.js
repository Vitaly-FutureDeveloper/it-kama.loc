const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-BODY";

const dialogsReducer = (state, action) => {
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