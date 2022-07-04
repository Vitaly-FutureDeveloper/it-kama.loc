import s from "./FriendsBlock.module.css";
import Friend from "./Friend/Friend";

const FriendsBlock = (props) => {
	const friendElements = props.state.map((item, i) => <Friend friend={item} key={i} />);

	return (
		<section className={s.FriendsBlock}>
			{friendElements}
		</section>
	);
};

export default FriendsBlock;