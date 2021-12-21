import React from 'react';
import './index.css';
import state from "./redux/state";
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';

// import {subscribe, addPost, updateNewPostChange, addMessage, updateNewMessageChange} from "./redux/state";
import store from "./redux/state";

export const rerenderEntireTree = (state) => {
	ReactDOM.render(
		<React.StrictMode>

			<App state={state}
			//		.bind(store)
			//		Для того чтоб, привязать контекст к store,
			//		Чтоб, когда мы обращаемся к props, this указывал
			// 		на store, а не к props
					 addPost={store.addPost.bind(store)}
					 updateNewPostChange={store.updateNewPostChange.bind(store)}
					 addMessage={store.addMessage.bind(store)}
					 updateNewMessageChange={store.updateNewMessageChange.bind(store)}	/>

		</React.StrictMode>,
		document.getElementById('root')
	);
}

store.subscribe(rerenderEntireTree);


rerenderEntireTree(store.getState());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
