import React, {useState} from "react";

import s from "./ProfileInfo.module.css";
import userPhoto from '../../../assets/img/im.png';
import Spinner from "../../common/spinners/spinner";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import LookingJobImg from "./LookingJob/LookingJob";

import ProfileDataForm from "../ProfileDataForm";
import Contact from "./Contact/Contact";

import reductBtnBackground from "./../../../assets/img/iconBtnReduct.png";
import photoBtnBackground from "./../../../assets/img/photocamera.png";

import cn from 'classnames';
import SpinHypnotic from "../../common/spinners/SpinHypnotic";

const FALLBACK_TEXT = "Не указано";


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

	const [editMode, setEditMode] = useState(false);

	if (!profile) {
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
	};


	return (
		<section className={s.content}>
			<header>
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
			</header>

			{ editMode
				? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile}  />
				: <ProfileData profile={profile}
											 goToEditMode={ () => { setEditMode(true) } }
											 isOwner={isOwner}
											 onMainPhotoSelected={onMainPhotoSelected} />
			}

		</section>
	);
};




const ProfileData = ({profile, isOwner, goToEditMode, onMainPhotoSelected}) => {

	return 	<div className={s.descriptionBlock}>

		{
			isOwner && <div className={s.reductBtn_wrap}>
				<button title="Редактировать профиль"
								onClick={goToEditMode}
								className={cn('btn', s.reductBtn)} style={{
					backgroundImage: `url(${reductBtnBackground})`,
				}}></button>
			</div>
		}

		<div className={s.descriptions}>
			<div className={s.descriptionName}>
				<div className={s.descriptionName__fullname}>
					{profile.fullName}
				</div>
				<div className={s.avatarBlock}>
					{profile.photos ?
						<img src={profile.photos.large || userPhoto}/>
						:
						<SpinHypnotic />
					}

					{/* Кнопка добавления фото */}
					{
						isOwner && <label title="Добавить фото"
															className={cn('btn', s.addPhotoBtn)}
															style={{
							backgroundImage: `url(${photoBtnBackground})`,
						}} >

							{/* input photo button */}
							<input type={"file"} onChange={onMainPhotoSelected} style={{ display: "none" }} />
						</label>
					}

				</div>

				<div className={s.lookingForAJob}>

					<div className={s.lookingForAJob__searche}>
						<b>Ищу работу:</b>
						{profile ?
							<LookingJobImg lookingForAJob={profile.lookingForAJob} />
							:
							<SpinHypnotic />
						}

					</div>

					<div className={s.lookingForAJob__title}>
						<b>Профессиональные навыки:</b>
						{
							profile ?
								<div>{profile.lookingForAJobDescription || FALLBACK_TEXT}</div>
								:
								<SpinHypnotic />
						}
					</div>

					<div className={s.lookingForAJob__about}>
						<b>Обо мне:</b>
						{
							profile ?
								<div>{profile.aboutMe || FALLBACK_TEXT}</div>
								:
								<SpinHypnotic />
						}
					</div>
				</div>
			</div>



			<ul className={s.contactList}>
				{ profile.contacts && Object.keys(profile.contacts).map((key, i) => {
					console.log(key);
					return <Contact key={i} contactTitle={key} contactValue={profile.contacts[key]} />
				})}
			</ul>
		</div>
	</div>
};




export default ProfileInfo;

