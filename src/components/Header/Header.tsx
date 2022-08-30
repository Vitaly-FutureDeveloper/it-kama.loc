import React from "react";
import s from './Header.module.css';
import logo from '../../assets/img/logo-social.png'
import {NavLink} from "react-router-dom";
import logoutBtnBackground from "../../assets/img/iconLogout.png";
import loginBtnBackground from "../../assets/img/iconLogin.png";
import cn from "classnames";
import { ThunkType } from "../../redux/profile-reducer";


export type MapPropsType = {
	isAuth: boolean,
	login: string | null,
};
export type DispatchPropsType = {
	logout: () => void,
};
const Header:React.FC<MapPropsType & DispatchPropsType> = ({login, logout, isAuth}) => {
	return (
		<header className={s.header}>

			<div className="iconBlock">
				<img src={logo} alt="" />
			</div>

			<div className={s.loginBlock}>
				{!isAuth ?
					<NavLink to={'/login'} title="Войти" className={cn('btn', s.logoutBtn)} style={{
						backgroundImage: `url(${loginBtnBackground})`,
					}}></NavLink>
				:
					<div className={s.logoutBlock}><b>{login}</b> <button title="Выйти" className={cn('btn', s.logoutBtn)}
						onClick={logout} style={{
						backgroundImage: `url(${logoutBtnBackground})`,
					}}></button></div>
				}
			</div>
		</header>
	);
};

export default Header;