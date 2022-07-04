import * as React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";




const MyPosts = React.memo((props) => {

	const onAddPost = (values) => {
		props.addPost(values.newPostText);
	};

	const postsElements = props.posts
		.map(p => <Post message={p.message} id={p.id} likeCount={p.likeCount} />);



	return (
		<div className={s.postsBlock}>
			<h2>Сообщения</h2>

			<AddPostFormRedux onSubmit={onAddPost} />
			<div className={s.posts}>
				{postsElements}
			</div>
		</div>
	);
});


const AddNewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				{/*<Field component={Textarea}*/}
				{/*			 // maxLenghtCreator(10) - вызываем*/}
				{/*				// вернёт функцию валидатор*/}
				{/*			 validate={[required, maxLenght10]}*/}
				{/*			 name={"newPostText"}*/}
				{/*			 placeholder={"Введите текст"} />*/}

				{createField("Введите пост",
					"newPostText",
					[],
					Textarea )}
			</div>
			<div className={s.sendBtnBlock}>
				<button className="btn btn-send">Отправить</button>
			</div>
		</form>
	)
};

const AddPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm);


export default MyPosts;

