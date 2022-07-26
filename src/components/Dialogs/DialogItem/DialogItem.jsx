import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import cn from "classnames";

const DialogItem = ({key, id, name}) => {
	const path = "/dialogs/" + id;

	return (
		<div key={key} className={cn(s.dialog, s.active)}>
			<NavLink to={path}>
				{name}
			</NavLink>
		</div>
	);
};

export default DialogItem;