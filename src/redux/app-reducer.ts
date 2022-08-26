import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";


const initialState = {
	initialized: false,
};
export type InitialStateType = typeof initialState;

const appReducer = (state=initialState, action:ActionTypes): InitialStateType => {

	switch (action.type){
		case "SN/APP/INITIALIZED_SUCCESS": {
			return {
				...state,
				initialized: true,
			};
		}


		default:
			return state;
	}

};


type ActionTypes = InferActionsTypes<typeof actions>;;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>;


export const actions = {
	initializedSuccess: () => ({ type: "SN/APP/INITIALIZED_SUCCESS" } as const ),
};


export const initializeApp = ():ThunkType => {
	return (dispatch) => {
		const promise = dispatch(getAuthUserData());

		Promise.all([promise]).then(() => {
			dispatch(actions.initializedSuccess());
		});
	}
};



export default appReducer;