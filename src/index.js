import React from 'react';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';

import store from "./redux/redux-store";
import {Provider} from "./StoreContext";

export const rerenderEntireTree = (state) => {
	ReactDOM.render(
		<React.StrictMode>
			<Provider store={store}>
				<App />
				{/*<App state={state}*/}
				{/*		 store={store}*/}
				{/*//		.bind(store)*/}
				{/*//		Для того чтоб, привязать контекст к store,*/}
				{/*//		Чтоб, когда мы обращаемся к props, this указывал*/}
				{/*// 		на store, а не к props*/}
				{/*		 dispatch={store.dispatch.bind(store)} />*/}
			</Provider>
		</React.StrictMode>,
		document.getElementById('root')
	);
}

store.subscribe(() => {
	rerenderEntireTree();
});


rerenderEntireTree();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
