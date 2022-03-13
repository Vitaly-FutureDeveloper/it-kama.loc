import * as React from 'react';
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLenghtCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";




const MyPosts = React.memo((props) => {

	const onAddPost = (values) => {
		props.addPost(values.newPostText);
	};

	const postsElements = props.posts
		.map(p => <Post message={p.message} id={p.id} likeCount={p.likeCount} />);



	return (
		<div className={s.postsBlock}>
			<p>myposts</p>

			<AddPostFormRedux onSubmit={onAddPost} />
			<div className={s.posts}>
				{postsElements}
			</div>
		</div>
	);
});

const maxLenght10 = maxLenghtCreator(10);

const AddNewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea}
							 // maxLenghtCreator(10) - вызываем
								// вернёт функцию валидатор
							 validate={[required, maxLenght10]}
							 name={"newPostText"}
							 placeholder={"Введите текст"} />
			</div>
			<div>
				<button>Отправить</button>
			</div>
		</form>
	)
};

const AddPostFormRedux = reduxForm({ form: 'ProfoleAddNewPostForm' })(AddNewPostForm);


export default MyPosts;

