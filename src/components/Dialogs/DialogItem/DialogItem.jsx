import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
	const path = "/dialogs/" + props.id;
	const name = props.name;

	return (
		<div className={s.dialog + ' ' + s.active}>
			<NavLink to={path}>
				{name}
			</NavLink>
		</div>
	);
};

export default DialogItem;