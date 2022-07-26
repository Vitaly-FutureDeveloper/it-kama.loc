import s from "./../Dialogs.module.css";


const Message = ({key, message}) => {
	return (
		<div key={key} className={s.massage}>{message}</div>
	);
};

export default Message;