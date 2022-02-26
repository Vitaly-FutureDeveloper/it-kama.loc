import s from './Header.module.css';
import logo from '../../assets/img/logo-social.png'
import {NavLink} from "react-router-dom";

const Header = (props) => {
	return (
		<header className={s.header}>
			<img src={logo} alt="" />

			<div className={s.loginBlock}>
				{!props.isAuth ?
					<NavLink to={'/login'}>Войти</NavLink>
				:
					<div>{props.login} <button onClick={props.logout}>Выйти</button></div>
				}
			</div>
		</header>
	);
};

export default Header;