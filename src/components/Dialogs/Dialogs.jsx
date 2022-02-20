import * as React from 'react';

import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLenghtCreator, required} from "../../utils/validators/validators";



const Dialogs = (props) => {

	const state = props.dialogsPage;

	const addNewMessage = (values) => {
		props.sendMessage(values.newMessageBody);
	};

	const dialogsElements = state.dialogs
		.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

	const messagesElements = state.messages
		.map(m => <Message message={m.name} key={m.id} id={m.id} />);


	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>

			<div className={s.messages}>
				{messagesElements}
			</div>

			<AddMessageFormRedux onSubmit={addNewMessage} />
			{/*Form*/}
		</div>
	)
};

const maxLenght50 = maxLenghtCreator(50);

const AddMessageForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className="form-block">
				<div className="">
					<Field component={Textarea}
								 validate={[required, maxLenght50]}
								 name="newMessageBody"
								 placeholder="Введите своё сообщение" />
				</div>
				<div className="">
					<button>Отправить</button>
				</div>
			</div>
		</form>
	);
};

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

export default Dialogs;