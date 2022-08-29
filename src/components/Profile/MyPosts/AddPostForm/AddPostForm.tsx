import * as React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../MyPosts.module.css";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";


export type AddPostFormValuesType = {
	newPostText:string,
};
type PostFormOwnProps = {};
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;

const AddPostForm:React.FC<InjectedFormProps<AddPostFormValuesType & PostFormOwnProps> & AddPostFormValuesType> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>

				{createField<AddPostFormValuesTypeKeys>("Введите пост",
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

const AddPostFormRedux = reduxForm<AddPostFormValuesType, PostFormOwnProps>
({ form: 'ProfileAddNewPostForm' })
//@ts-ignore
(AddPostForm);
// todo: types for reduxforms

export default AddPostFormRedux;