import React from "react";
import s from "./Post.module.css";
import posterPhoto from "../../../../assets/img/PicsArt_11-14-051826.webp"
import {PostType} from "../../../../types/types";


type PropsType = PostType;

const Post:React.FC<PropsType> = ({message, likeCount}) => {
	return (
		<div className={s.item}>
			<div>
			<img
				src={posterPhoto}
				title="Картиночка"
				alt="Картинка" />
			</div>
			<div>
				<p>{message}</p>
			</div>
			<div>
				<span>likes: {likeCount}</span>
			</div>
		</div>
	);
};

export default Post;

