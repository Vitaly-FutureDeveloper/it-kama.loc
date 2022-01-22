import s from "./FriendsBlock.module.css";
import Friend from "./Friend/Friend";

const FriendsBlock = (props) => {
	const friendElements = props.state.map((item) => <Friend friend={item} />);

	return (
		<section className={s.FriendsBlock}>
			{friendElements}
		</section>
	);
};

export default FriendsBlock;