import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";



const Profile = ({isOwner, profile, saveProfile, status, updateStatus, savePhoto, ...props}) => {
	return (
		<div>
			<ProfileInfo isOwner={isOwner}
									 profile={profile}
									 saveProfile={saveProfile}
									 status={status}
									 updateStatus={updateStatus}
									 savePhoto={savePhoto}
			/>
			<MyPostsContainer store={props.store}  />
		</div>
	);
};

export default Profile;

