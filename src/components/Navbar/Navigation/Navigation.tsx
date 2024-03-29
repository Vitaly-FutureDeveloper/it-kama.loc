import React from "react";
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navigation:React.FC = () => {
	return (
			<nav>
				<ul className={s.navList}>
					<li className={s.item}>
						<NavLink to="/Profile" activeClassName={s.active}>Profile</NavLink>
					</li>
					<li className={s.item}>
						<NavLink to="/Dialogs" activeClassName={s.active}>Messages</NavLink>
					</li>
					<li className={s.item}>
						<NavLink to="/Users" activeClassName={s.active}>Users</NavLink>
					</li>
					<li className={s.item}>
						<NavLink to="/News" activeClassName={s.active}>News</NavLink>
					</li>
					<li className={s.item}>
						<NavLink to="/Music" activeClassName={s.active}>Music</NavLink>
					</li>
					<li className={s.item}>
						<NavLink to="/Settings" activeClassName={s.active}>Settings</NavLink>
					</li>
					<li className={s.item}>
						<NavLink to="/Login" activeClassName={s.active}>Login</NavLink>
					</li>
				</ul>
			</nav>
	);
};

export default Navigation;