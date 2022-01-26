import React from "react";
import s from "./LookingJob.module.css"
import iconYes from "./../../../../assets/img/iconYes.jpg";
import iconNo from "./../../../../assets/img/iconNo.png";

const LookingJob = (props) => {
	const icon = props.lookingForAJob ? iconYes : iconNo;
	const title = props.lookingForAJob ? "Ищу работу" : "Не ищу работу";

	return (
		<div className={s.imgBlock}>
			<img scr={icon} title={title} alt="Картинка" />
		</div>
	);
};

export default LookingJob;