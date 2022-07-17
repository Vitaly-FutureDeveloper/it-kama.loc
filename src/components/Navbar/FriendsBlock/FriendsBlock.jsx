import s from "./FriendsBlock.module.css";
import Friend from "./Friend/Friend";

const FriendsBlock = ({friends}) => {
	const friendElements = friends.map((item) => <Friend name={item.name} id={item.id} />);

	return (
		<section className={s.FriendsBlock}>
			{friendElements}
		</section>
	);
};

export default FriendsBlock;