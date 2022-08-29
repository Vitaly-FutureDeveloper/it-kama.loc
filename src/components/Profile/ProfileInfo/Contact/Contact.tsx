import React from "react";
import s from "../ProfileInfo.module.css";

const FALLBACK_TEXT = "Не указано";

type PropsType = {
	contactTitle:string,
	contactValue:string,
};
const Contact:React.FC<PropsType> = ({contactTitle, contactValue}) => {
	return <li className={s.contactList__item}>
		<b>{contactTitle}:</b> {contactValue || FALLBACK_TEXT}
	</li>
};

export default Contact;