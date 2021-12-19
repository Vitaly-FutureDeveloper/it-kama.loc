import s from "./ProfileInfo.module.css";


const ProfileInfo = () => {
	return (
	<section className={s.content}>
		<header>
			<img
				src="https://avatars.mds.yandex.net/get-zen_doc/1101166/pub_5d2eda10ddfef600afc069c2_5d2edb324e057700ad304db3/scale_1200"
				alt="" width="100%"  / >
		</header>
		<div className="description-block">
			ava + description
		</div>

	</section>
);
};

export default ProfileInfo;

