import React from "react";
import s from "./Post.module.css";
import posterPhoto from "../../../../assets/img/PicsArt_11-14-051826.webp"

const Post = ({id, message, likeCount}) => {
	return (
		<div key={id} className={s.item}>
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

