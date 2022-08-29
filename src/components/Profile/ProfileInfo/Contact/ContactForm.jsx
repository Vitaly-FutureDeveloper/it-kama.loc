import React from "react";
import s from "../ProfileInfo.module.css";
import {createField, Input} from "../../../common/FormsControls/FormsControls";
//
// type PropsType = {
// 	contactTitle:any,
// };
const ContactForm = ({contactTitle}) => {
	return <li className={s.contactList__item}>
		<b>{contactTitle}:</b>

		{createField({contactTitle},
		`contacts.${contactTitle}`,
		[],
		Input )}
	</li>
};

export default ContactForm;