import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {Avatar, Button, Col, Layout, Menu, MenuProps, Row} from "antd";
import {UserOutlined} from '@ant-design/icons';

import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";


const AppHeader:React.FC = () => {

	const isAuth = useSelector(selectIsAuth);
	const login = useSelector(selectCurrentUserLogin);
	const dispatch = useDispatch();

	const logoutCallback = () => {
		dispatch(logout());
	};


	const items1: MenuProps['items'] = [() => <Link to="/Users">Developers</Link>].map((item, i) => {
		const subKey = 4 * i + 1;
		return {
			key: subKey,
			label: item(),
		};
	});

	const { Header } = Layout;

	return (
		<Header className="header">
			<div className="logo" />
			<Row>
				<Col span={15}>
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} />
				</Col>


						{/*{user}*/}
				{!isAuth ?
					<Col span={6}>
						<button>
							<Link to={'/login'} title="Войти"></Link>
						</button>
					</Col>
					:
					<>
						<Col span={2}>
							<Avatar alt={login || ''} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} icon={<UserOutlined />} size="large"></Avatar>
						</Col>
						<Col span={5}>
							<Button title="Выйти" onClick={logoutCallback} ghost>Выйти</Button>
						</Col>
					</>
				}

			</Row>
		</Header>
	);
};

export default AppHeader;