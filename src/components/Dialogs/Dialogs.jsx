import * as React from 'react';

import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {
	
	const newMessageElement = React.createRef();
	const addMessage = () => {
		props.addMessage();
	};
	const onPostMessage = () => {
		const text = newMessageElement.current.value;
		props.updateNewMessageChange(text);
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
				<textarea onChange={onPostMessage} value={props.dialogsPage.newMessageText} ref={newMessageElement} name="text" id="" cols="30" rows="8"></textarea>
				<button onClick={addMessage} type="submit">Отправить</button>
			</div>
		</div>
	)
}

export default Dialogs;