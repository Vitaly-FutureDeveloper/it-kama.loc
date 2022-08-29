import React from "react";
import s from "./spinner.module.css";

const Spinner:React.FC = () => {
	return <div className={s.lds_ellipsis}>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
};

export default Spinner;