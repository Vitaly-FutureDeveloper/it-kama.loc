import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";



const Profile = (props) => {
	return (
		<div>
			<ProfileInfo isOwner={props.isOwner}
									 profile={props.profile}
									 saveProfile={props.saveProfile}
									 status={props.status}
									 updateStatus={props.updateStatus}
									 savePhoto={props.savePhoto}
			/>
			<MyPostsContainer store={props.store}  />
		</div>
	);
};

export default Profile;

