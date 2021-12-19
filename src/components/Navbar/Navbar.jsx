import s from "./Navbar.module.css";
import Navigation from "./Navigation/Navigation";
import FriendsBlock from "./FriendsBlock/FriendsBlock"

const Navbar = (props) => {

	return (
		<aside className={s.nav}>
			<Navigation />
			<FriendsBlock state={props.state} />


		</aside>
	);
};

export default Navbar;