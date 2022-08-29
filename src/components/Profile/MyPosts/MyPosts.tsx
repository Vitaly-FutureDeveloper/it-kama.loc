import * as React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/types";


type PropsType = {
	posts: Array<PostType>,
	addPost: (newPostText:string) => void,
};

const MyPosts:React.FC<PropsType> = (props) => {

	const onAddPost = (values:AddPostFormValuesType) => {
		props.addPost(values.newPostText);
	};

	const postsElements = props.posts
		.map(p => <Post message={p.message} key={p.id} id={p.id} likeCount={p.likeCount} />);

	return (
		<div className={s.postsBlock}>
			<h2>Сообщения</h2>

			<AddPostForm onSubmit={onAddPost} />
			<div className={s.posts}>
				{postsElements}
			</div>
		</div>
	);
};


const MyPostsMemoized = React.memo(MyPosts);


export default MyPostsMemoized;

