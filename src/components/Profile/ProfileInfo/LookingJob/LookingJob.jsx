import React from "react";
import s from "./LookingJob.module.css"
import iconYes from "./../../../../assets/img/iconYes.png";
import iconNo from "./../../../../assets/img/iconNo.png";

const LookingJobImg = (props) => {
	const lookJob = props.lookingForAJob;
	const icon = lookJob ? iconYes : iconNo;
	const title = lookJob ? "Ищу работу" : "Не ищу работу";

	return (
		<div className={s.imgBlock}>
			<img src={icon} title={title} alt="Картинка" />
		</div>
	);
};

export default LookingJobImg;