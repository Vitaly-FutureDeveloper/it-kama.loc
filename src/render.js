import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost, updateNewPostChange, addMessage, updateNewMessageChange} from "./redux/state";


export const rerenderEntireTree = (state) => {
	ReactDOM.render(
		<React.StrictMode>

			<App state={state}
					 addPost={addPost}
					 updateNewPostChange={updateNewPostChange}
					 addMessage={addMessage}
					 updateNewMessageChange={updateNewMessageChange}	/>
		</React.StrictMode>,
		document.getElementById('root')
	);
}

