import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./ProfileInfo/ProfileInfo.module.css";

import {createField, GetStringKeys, Input, Textarea} from "../common/FormsControls/FormsControls";
import ContactForm from "./ProfileInfo/Contact/ContactForm";
import {ProfileType} from "../../types/types";


type ProfileFormOwnProps = {
	profile:ProfileType,
};
type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm:React.FC<InjectedFormProps<ProfileTypeKeys & ProfileFormOwnProps> & ProfileFormOwnProps> = ({handleSubmit, profile, error}) => {

	return (
		<form className={s.descriptionBlock} onSubmit={handleSubmit}>

			{ error &&
				<div className={s.formSummaryError}>
					{error}
				</div>
			}

		<div>
			<button>Сохранить</button>
		</div>

		<div className={s.descriptions}>

			<div className={s.descriptionName}>

				<div className={s.descriptionName__fullname}>

					{createField<ProfileTypeKeys>("Полное имя",
						"fullName",
						[],
						Input )}

				</div>

				<div className={s.lookingForAJob}>

					<div className={s.lookingForAJob__searche}>
						<b>Ищу работу:</b>

						{createField<ProfileTypeKeys>("",
							"lookingForAJob",
							[],
							Input,
							{type: "checkbox"})}
					</div>

					<div className={s.lookingForAJob__title}>
						<b>Профессиональные навыки:</b>

						{createField<ProfileTypeKeys>("Мои профессиональые навыки",
							"aboutMe",
							[],
							Textarea )}
					</div>

					<div className={s.lookingForAJob__about}>
						<b>Обо мне:</b>

						<div>
							{createField<ProfileTypeKeys>("Обо мне",
								"lookingForAJobDescription",
								[],
								Textarea )}
						</div>
					</div>

					<ul className={s.contactList}>
						{/* todo: create some solution for embedded objects  */}
						{profile.contacts && Object.keys(profile.contacts).map((key, i) => {
							return <ContactForm key={i} contactTitle={key} />
						})}
					</ul>

				</div>
			</div>

			</div>
	</form>
	);
};

const ProfileDataFormRedux = reduxForm<ProfileTypeKeys, ProfileFormOwnProps>({
	// a unique name for the form
	form: 'edit-profile'
})
//@ts-ignore
(ProfileDataForm);
// todo: types for reduxforms

export default ProfileDataFormRedux;