import {InferActionsTypes} from "./redux-store";

type DialogsType = {
	id: number,
	name: string,
};
type MessagesType = {
	id: number,
	message: string,
};

const initialState = {
	dialogs: [
		{id: 1, name: "Dima",},
		{id: 2, name: "Lesha",},
		{id: 3, name: "Masha",},
		{id: 4, name: "Lena",},
		{id: 5, name: "Pasha",},
		{id: 6, name: "Dasha",},
	] as Array<DialogsType>,
	messages: [
		{id: 1, message: "How are you?",},
		{id: 2, message: "Yuo mmen",},
		{id: 3, message: "Hi",},
	] as Array<MessagesType>,
};
export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;
// type ThunkType = BaseThunkType<ActionsTypes>;

const dialogsReducer = (state=initialState, action:ActionsTypes):InitialStateType => {
	switch (action.type){
		case "SN/DIALOGS/ADD-MESSAGE": {
			return {
				...state,
				messages : [...state.messages, {id: 5, message: action.newMessageBody}]
			};
		}

		default:
			return state;
	}
};

export const actions = {
	sendMessage : (newMessageBody:string) => ({
		type: "SN/DIALOGS/ADD-MESSAGE",
		newMessageBody
	} as const ),
};

export default dialogsReducer;