import * as React from 'react';

import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {actions, InitialStateType} from "../../redux/dialogs-reducer";
import {AddMessageFormRedux, NewMessageFormType} from "./AddMessageForm/AddMessageForm";
import {useDispatch} from "react-redux";


type PropsType = {
	dialogsPage: InitialStateType,
	sendMessage: (messageText:string) => void,
};

const Dialogs:React.FC<PropsType> = ({ dialogsPage, sendMessage}) => {
	const dispatch = useDispatch();

	const addNewMessage = (values: NewMessageFormType) => {
		dispatch(actions.sendMessage(values.newMessageBody));
	};

	const dialogsElements = dialogsPage.dialogs
		.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);

	const messagesElements = dialogsPage.messages
		.map(m => <Message message={m.message} key={m.id} />);


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



export default Dialogs;