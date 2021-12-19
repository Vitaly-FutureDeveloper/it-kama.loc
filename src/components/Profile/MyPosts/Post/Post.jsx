import s from "./Post.module.css";

const Post = (props) => {
	return (
		<div className={s.item}>
			<div>
			<img
				src="https://thumb.tildacdn.com/tild6139-3035-4662-a238-376232323063/-/resize/790x/-/format/webp/PicsArt_11-14-051826.jpeg"
				alt=""/>
			</div>
			<div>
				<p>{props.message}</p>
			</div>
			<div>
				<span>likes: {props.likeCount}</span>
			</div>
		</div>
	);
};

export default Post;

