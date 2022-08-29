import * as React from 'react';
import {connect} from "react-redux";

import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {AppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/types";

export type MapStatePropsType = {
	posts: Array<PostType>,
};
export type MapDispatchPropsType = {
	addPost: (userId:string) => void,
};
type OwnProps = {};

const mapStateToProps = (state:AppStateType) => {
	return {
		posts: state.profilePage.posts,
	};
};

const mapDispatchToProps = {
	addPost: (newPostText:string) => {
		actions.addPostCreator(newPostText);
	},
};

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;

