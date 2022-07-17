import s from "./../Dialogs.module.css";


const Message = ({message}) => {
	return (
		<div className={s.massage}>{message}</div>
	);
};

export default Message;