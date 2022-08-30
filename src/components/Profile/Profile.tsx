import React from "react";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
	isOwner:boolean,
	profile:ProfileType | null,
	status:string,
	saveProfile: (profile:ProfileType) => Promise<any>,
	updateStatus: (status:string) => void,
	savePhoto: (file:File) => void,
};

const Profile:React.FC<PropsType> = ({isOwner,
																			 profile,
																			 saveProfile,
																			 status,
																			 updateStatus,
																			 savePhoto}) => {
	return (
		<div>
			<ProfileInfo isOwner={isOwner}
									 profile={profile}
									 saveProfile={saveProfile}
									 status={status}
									 updateStatus={updateStatus}
									 savePhoto={savePhoto}
			/>
			<MyPostsContainer />
		</div>
	);
};

export default Profile;

