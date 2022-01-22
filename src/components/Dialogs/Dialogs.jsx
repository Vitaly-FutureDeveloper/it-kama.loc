import * as React from 'react';

import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {
	const state = props.dialogsPage;
	// const newMessageElement = React.createRef();
	const addMessage = () => {
		props.sendMessage();
	};
	const onNewMessageText = (e) => {
		const text = e.target.value;
		props.updateNewMessageBody(text);
	}

	const dialogsElements = state.dialogs
		.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);

	const messagesElements = state.messages
		.map(m => <Message message={m.name} key={m.id} id={m.id}/>);

	const newMessageBody = state.newMessageBody;

	return (
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
										value={newMessageBody}
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