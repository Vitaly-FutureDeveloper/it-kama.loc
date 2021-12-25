import * as React from 'react';

import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";


const Dialogs = (props) => {
	
	// const newMessageElement = React.createRef();
	const addMessage = () => {
		const action = addMessageCreator();
		props.dispatch(action);
	};
	const onNewMessageText = (e) => {
		const text = e.target.value;
		const action = updateNewMessageBodyCreator(text);

		props.dispatch(action);
	}

	const dialogsElements = props.dialogsPage.dialogs
		.map(d => <DialogItem name={d.name} id={d.id} />);

	const messagesElements = props.dialogsPage.messages
		.map(m => <Message message={m.name} id={m.id} /> );

	return(
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>

			<div className={s.messages}>
				{messagesElements}
			</div>

			<div className="form-block">
				<div className="">
					<textarea onChange={onNewMessageText}
										value={props.dialogsPage.newMessageBody}
										name="text" id="" cols="30" rows="8"></textarea>
				</div>
				<div className="">
					<button onClick={addMessage} type="submit">Отправить</button>
				</div>
			</div>
		</div>
	)
};

export default Dialogs;