import s from './Header.module.css';
import logo from '../../assets/img/logo-social.png'

const Header = () => {
	return (
		<header className={s.header}>
			<img src={logo} alt="" />
		</header>
	);
};

export default Header;