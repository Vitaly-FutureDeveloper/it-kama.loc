import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form';

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

const reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
// export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>;
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action, R=Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
		applyMiddleware(thunkMiddleware)
));


export default store;