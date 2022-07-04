import s from "./Navbar.module.css";
import Navigation from "./Navigation/Navigation";
import FriendsBlockContainer from "./FriendsBlock/FriendsBlockContainer";

const Navbar = () => {
	return (
		<aside className={s.nav}>
			<Navigation />
			<FriendsBlockContainer />
		</aside>
	);
};

export default Navbar;