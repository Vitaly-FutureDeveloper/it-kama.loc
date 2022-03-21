import s from "./ProfileInfo.module.css";
import userPhoto from '../../../assets/img/im.png';
import Spinner from "../../common/spinners/spinner";
import LookingJob from "./LookingJob/LookingJob";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
	if (!props.profile) {
		return <Spinner />
	}

	return (
	<section className={s.content}>
		<header>
			<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
		</header>
		<div className={s.descriptionBlock}>


			<div className={s.descriptions}>
				<div className={s.descriptionName}>
					<div className={s.descriptionName__fullname}>
						{props.profile.fullName}
					</div>
					<div className={s.avatarBlock}>
						<img src={props.profile.photos.small || userPhoto}/>
					</div>
					<div className={s.lookingForAJob}>
						<div className={s.lookingForAJob__img}>
							<LookingJob lookingForAJob={props.profile.lookingForAJob} />
						</div>
						<div className={s.lookingForAJob__title}>
							{props.profile.lookingForAJobDescription}
						</div>
					</div>
				</div>

				<ul className={s.contactList}>
					<li className={s.contactList__item}>
						facebook: {props.profile.contacts.facebook || 'Не указан'}
					</li>
					<li className={s.descriptionList__item}>
						vk: {props.profile.contacts.vk || 'Не указан'}
					</li>
					<li className={s.descriptionList__item}>
						twitter: {props.profile.contacts.twitter || 'Не указан'}
					</li>
					<li className={s.descriptionList__item}>
						github: {props.profile.contacts.github || 'Не указан'}
					</li>
					<li className={s.descriptionList__item}>
						instagram: {props.profile.contacts.instagram || 'Не указан'}
					</li>
					<li className={s.descriptionList__item}>
						Мой линк: {props.profile.contacts.mainLink || 'Не указан'}
					</li>
					<li className={s.descriptionList__item}>
						website: {props.profile.contacts.website || 'Не указан'}
					</li>
					<li className={s.descriptionList__item}>
						youtube: {props.profile.contacts.youtube || 'Не указан'}
					</li>
				</ul>
			</div>
		</div>

	</section>
);
};

export default ProfileInfo;

