import s from "./Post.module.css";
import posterPhoto from "../../../../assets/img/PicsArt_11-14-051826.webp"

const Post = (props) => {
	return (
		<div className={s.item}>
			<div>
			<img
				src={posterPhoto}
				title="Картиночка"
				alt="Картинка" />
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

