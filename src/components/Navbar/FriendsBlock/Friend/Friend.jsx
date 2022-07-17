import React from "react";
import s from "./Friend.module.css"

const Friend = ({id, name}) => {

	return (
		<div key={id} className={s.friend}>
			<p className={s.friend__name}>{name}</p>
		</div>
	)
};

export default Friend;