import s from "./Navbar.module.css";
import Navigation from "./Navigation/Navigation";
import FriendsBlockContainer from "./FriendsBlock/FriendsBlockContainer";

type PropsType = {};
const Navbar:React.FC<PropsType> = () => {
	return (
		<aside className={s.nav}>
			<Navigation />
			<FriendsBlockContainer />
		</aside>
	);
};

export default Navbar;