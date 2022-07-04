import React from "react";
import s from "./ProfileInfo/ProfileInfo.module.css";
import userPhoto from "../../assets/img/im.png";
import LookingJobImg from "./ProfileInfo/LookingJob/LookingJob";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import ContactForm from "./ProfileInfo/Contact/ContactForm";

const ProfileDataForm = ({handleSubmit, profile, error}) => {

	return (
		<form className={s.descriptionBlock} onSubmit={handleSubmit}>

			{ error && <div className={s.formSummaryError}>
					{error}
				</div>
			}

		<div>
			<button>Сохранить</button>
		</div>

		<div className={s.descriptions}>

			<div className={s.descriptionName}>

				<div className={s.descriptionName__fullname}>

					{createField("Полное имя",
						"fullName",
						[],
						Input )}

				</div>

				{/*<div className={s.avatarBlock}>*/}
				{/*	<img src={profile.photos.small || userPhoto}/>*/}

				{/*	<input type={"file"} onChange={() => {}} />*/}
				{/*</div>*/}

				<div className={s.lookingForAJob}>

					<div className={s.lookingForAJob__searche}>
						<b>Ищу работу:</b>

						{createField("",
							"lookingForAJob",
							[],
							Input,
							{type: "checkbox"})}
					</div>

					<div className={s.lookingForAJob__title}>
						<b>Профессиональные навыки:</b>

						{createField("Мои профессиональые навыки",
							"aboutMe",
							[],
							Textarea )}
					</div>

					<div className={s.lookingForAJob__about}>
						<b>Обо мне:</b>

						<div>
							{createField("Обо мне",
								"lookingForAJobDescription",
								[],
								Textarea )}
						</div>
					</div>

					<ul className={s.contactList}>
						{profile.contacts && Object.keys(profile.contacts).map((key, i) => {
							return <ContactForm key={i} contactTitle={key} contactValue={profile.contacts[key]} />
						})}
					</ul>

				</div>
			</div>

			</div>
	</form>
	);
};

const ProfileDataFormRedux = reduxForm({
	// a unique name for the form
	form: 'edit-profile'
})(ProfileDataForm);

export default ProfileDataFormRedux;