import * as React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";




const MyPosts = (props) => {

	const newPostElement = React.createRef();
	const addPost = () => {
		props.dispatch(addPostActionCreator());
	};
	const onPostChange = () =>{
		const text = newPostElement.current.value;
		const action = updateNewPostTextActionCreator(text);

		props.dispatch(action);
	};

	const postsElements = props.posts
		.map(p => <Post message={p.message} id={p.id} likeCount={p.likeCount} />);

	return (
		<div className={s.postsBlock}>
			myposts
			<div>
				<textarea onChange={onPostChange} value={props.newPostText} ref={newPostElement} name="text" id="" cols="30" rows="10" />
				<button onClick={addPost} type='submit'>Отправить</button>
			</div>
			<div className={s.posts}>
				{postsElements}
			</div>
		</div>
	);
};

export default MyPosts;

