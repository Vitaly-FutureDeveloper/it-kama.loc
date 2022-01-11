import s from "./FriendsBlock.module.css";
import Friend from "./Friend/Friend";
import StoreContext from "../../../StoreContext";

const FriendsBlock = (props) => {

	return (
		<StoreContext.Consumer>
			{
				(store)=> {
					const state = store.getState().sidebar.friends;
					const friendElements = state.map((item) => <Friend friend={item} />);

					<section className={s.FriendsBlock}>
						{friendElements}
					</section>
				}
			}
		</StoreContext.Consumer>
	)
};

export default FriendsBlock;