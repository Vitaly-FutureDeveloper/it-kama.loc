import * as React from 'react';
import {addPostCreator,	updateNewPostTextCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateNewPostChange: (body) => {
			const action = updateNewPostTextCreator(body);
			dispatch(action);
		},
		addPost: () => {
			dispatch(addPostCreator());
		},
	}
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

