import React, {useState} from "react";

import s from "./ProfileInfo.module.css";
import userPhoto from '../../../assets/img/im.png';
import Spinner from "../../common/spinners/spinner";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import LookingJobImg from "./LookingJob/LookingJob";

import ProfileDataForm from "../ProfileDataForm";
import Contact from "./Contact/Contact";

const FALLBACK_TEXT = "Не указано";


const ProfileInfo = ({status, updateStatus, isOwner, savePhoto, saveProfile, ...props}) => {

	const [editMode, setEditMode] = useState(false);


	if (!props.profile) {
		return <Spinner />
	}



	const onMainPhotoSelected = (e) => {
		if (e.target.files.length){
			savePhoto(e.target.files[0]);
		}
	};

	const onSubmit = (formData) => {
		saveProfile(formData).then(() => {
			setEditMode( false );
		})
			// .catch((error) => { throw error });

	};


	return (
		<section className={s.content}>
			<header>
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
			</header>

			{ editMode
				? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}  />
				: <ProfileData profile={props.profile}
											 goToEditMode={ () => { setEditMode(true) } }
											 isOwner={isOwner}
											 onMainPhotoSelected={onMainPhotoSelected} />
			}

		</section>
	);
};




const ProfileData = ({profile, isOwner, goToEditMode, onMainPhotoSelected}) => {

	return 	<div className={s.descriptionBlock}>

		{ isOwner && <div><button onClick={goToEditMode}>Редактировать</button> </div>}

		<div className={s.descriptions}>
			<div className={s.descriptionName}>
				<div className={s.descriptionName__fullname}>
					{profile.fullName}
				</div>
				<div className={s.avatarBlock}>
					<img src={profile.photos.small || userPhoto}/>

					{ isOwner && <input type={"file"} onChange={onMainPhotoSelected} /> }

				</div>
				<div className={s.lookingForAJob}>
					<div className={s.lookingForAJob__img}>
						<LookingJobImg lookingForAJob={profile.lookingForAJob} />
					</div>
					<div className={s.lookingForAJob__title}>
						<b>Профессиональные навыки:</b>
						<div>
							{profile.lookingForAJobDescription || FALLBACK_TEXT}
						</div>
					</div>

					<div className={s.lookingForAJob__about}>
						<b>Обо мне:</b>
						<div>
							{profile.aboutMe || FALLBACK_TEXT}
						</div>
					</div>
				</div>
			</div>



			<ul className={s.contactList}>
				{Object.keys(profile.contacts).map((key) => {
					return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
				})}
			</ul>
		</div>
	</div>
};




export default ProfileInfo;

