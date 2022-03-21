import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";



const Profile = ({profile, status, updateStatus, ...props}) => {
	return (
		<div>
			<ProfileInfo profile={profile}
									 status={status}
									 updateStatus={updateStatus}
			/>
			<MyPostsContainer store={props.store}  />
		</div>
	);
};

export default Profile;

