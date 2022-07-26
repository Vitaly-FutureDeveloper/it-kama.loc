import React from "react";
import s from "../ProfileInfo.module.css";
import {createField, Input} from "../../../common/FormsControls/FormsControls";


const ContactForm = ({contactTitle, contactValue}) => {
	return <li className={s.contactList__item}>
		<b>{contactTitle}:</b>

		{createField({contactTitle},
		`contacts.${contactTitle}`,
		[],
		Input )}
	</li>
};

export default ContactForm;