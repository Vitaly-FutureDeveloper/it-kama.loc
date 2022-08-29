import React from "react";
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import cn from "classnames";


type PropsType = {
	id:number,
	name:string,
};
const DialogItem:React.FC<PropsType> = ({id, name}) => {
	const path = "/dialogs/" + id;

	return (
		<div className={cn(s.dialog, s.active)}>
			<NavLink to={path}>
				{name}
			</NavLink>
		</div>
	);
};

export default DialogItem;