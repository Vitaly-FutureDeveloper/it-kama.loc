import s from "./ProfileInfo.module.css";
import genPhoto from "../../../assets/img/scale_1200.webp"

const ProfileInfo = () => {
	return (
	<section className={s.content}>
		<header>
			<img
				src={genPhoto}
				alt="" width="100%"  />
		</header>
		<div className="description-block">
			ava + description
		</div>

	</section>
);
};

export default ProfileInfo;

