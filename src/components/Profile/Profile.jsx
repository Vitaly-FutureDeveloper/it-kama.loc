import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {addPost} from "../../redux/store";

// const posts = [
// 	{id: "1", message: "How are you?", likeCount: "15"},
// 	{id: "2", message: "It's my first post", likeCount: "55"},
// ];

const Profile = (props) => {
	return (
		<div>
			<ProfileInfo />
			<MyPosts posts={props.profilePage.posts}
							 newPostText={props.profilePage.newPostText}
							 dispatch={props.dispatch}  />
		</div>
	);
};

export default Profile;

