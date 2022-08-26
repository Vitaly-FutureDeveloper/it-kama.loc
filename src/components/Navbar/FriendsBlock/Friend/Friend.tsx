import React from "react";
import s from "./Friend.module.css"

type PropsType = {
	name:string
};
const Friend:React.FC<PropsType> = ({name}) => {

	return (
		<div className={s.friend}>
			<p className={s.friend__name}>{name}</p>
		</div>
	)
};

export default Friend;