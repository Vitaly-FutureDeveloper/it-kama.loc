import s from './Header.module.css';
import logo from '../../assets/img/logo-social.png'
import {NavLink} from "react-router-dom";
import logoutBtnBackground from "../../assets/img/iconLogout.png";
import loginBtnBackground from "../../assets/img/iconLogin.png";

const Header = (props) => {
	return (
		<header className={s.header}>

			<div className="iconBlock">
				<img src={logo} alt="" />
			</div>

			<div className={s.loginBlock}>
				{!props.isAuth ?
					<NavLink to={'/login'} title="Войти" className={`btn ${s.logoutBtn}`} style={{
						backgroundImage: `url(${loginBtnBackground})`,
					}}></NavLink>
				:
					<div className={s.logoutBlock}><b>{props.login}</b> <button title="Выйти" className={`btn ${s.logoutBtn}`}
						onClick={props.logout} style={{
						backgroundImage: `url(${logoutBtnBackground})`,
					}}></button></div>
				}
			</div>
		</header>
	);
};

export default Header;