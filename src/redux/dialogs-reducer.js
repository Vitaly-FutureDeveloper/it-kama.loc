const ADD_MESSAGE = "ADD-MESSAGE";


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
	]
};

const dialogsReducer = (state=initialState, action) => {

	switch (action.type){
		case ADD_MESSAGE: {
			return {
				...state,
				messages : [...state.messages, {id: 5, name: action.newMessageBody}]
			};
		}

		default:
			return state;
	}

};


export const addMessageCreator = (newMessageBody) => {
	return {
		type: ADD_MESSAGE,
			newMessageBody
	}
};

export default dialogsReducer;