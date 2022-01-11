import * as React from 'react';
import {addPostCreator,	updateNewPostTextCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";


const MyPostsContainer = (props) => {
	// const state = props.store.getState();
	return (
		<StoreContext.Consumer>
			{
				(store) => {
					const addPost = () => {
						store.dispatch(addPostCreator());
					};
					const onPostChange = (text) => {
						const action = updateNewPostTextCreator(text);
						store.dispatch(action);
					};


					const state = store.getState();
					return (
						<MyPosts updateNewPostChange={onPostChange}
										 addPost={addPost}
										 posts={state.profilePage.posts}
										 newPostText={state.profilePage.newPostText}/>
					)
				}
			}
		</StoreContext.Consumer>
	);
};

export default MyPostsContainer;

