import React from "react";
import s from "./Friend.module.css"

const Friend = (props) => {

	return (
		<div key={props.key} className={s.friend}>
			<p className={s.friend__name}>{props.friend.name}</p>
		</div>
	)
};

export default Friend;