import * as React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";

import {maxLenghtCreator, required} from "../../../utils/validators/validators";
import s from "./AddMessageForm.module.css";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";


const maxLenght50 = maxLenghtCreator(50);

export type NewMessageFormType = {
	newMessageBody:string,
};
type NewMessageFormValuesTypeKeys = Extract <keyof NewMessageFormType, string>;
type PropsType = {};

const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormType & PropsType> & PropsType> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={s.formBlock}>
				<div className="">
					{createField<NewMessageFormValuesTypeKeys>("Введите своё сообщение", "newMessageBody", [required, maxLenght50], Textarea)}
				</div>
				<div className={s.btnSendBlock}>
					<button className="btn btn-send">Отправить</button>
				</div>
			</div>
		</form>
	);
};

export const AddMessageFormRedux = reduxForm<NewMessageFormType>({form: "dialogAddMessageForm"})(AddMessageForm);