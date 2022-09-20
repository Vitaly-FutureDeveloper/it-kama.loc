import React from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";

import store, {AppStateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import {withSuspense} from "./hoc/withSuspense";

import './App.css';
import 'antd/dist/antd.css';
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import {UsersPage} from "./components/Users/UsersPage";
import Spinner from "./components/common/spinners/spinner";
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu} from "antd";

import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import AppHeader from "./components/Header/Header";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const LoginPage = React.lazy(() => import("./Login/LoginPage"));


type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	initializeApp: () => void,
};

class App extends React.Component<MapPropsType & DispatchPropsType> {

	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		alert('какая-то ошибка');
		throw e;
	}

	componentDidMount() {
		this.props.initializeApp();

		window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
	}

	componentWillUnmount() {
		window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
	}

	render() {

		if (!this.props.initialized) {
			return <Spinner />
		}

		const { Content, Footer, Sider } = Layout;

		const navLabels = [
			() => <Link to="/Profile">Profile</Link>,
			() => <Link to="/Dialogs">Messages</Link>,
			() => <Link to="/Users">Users</Link>,
			() => <Link to="/News">News</Link>,
			() => <Link to="/Music">Music</Link>,
			() => <Link to="/Settings">Settings</Link>,
			() => <Link to="/Login">Login</Link>,
		];

		const items2: MenuProps['items'] = [UserOutlined].map(
			(icon, index) => {
				const key = String(index + 1);

				return {
					key: `sub${key}`,
					icon: React.createElement(icon),
					label: `Открыть меню`,

					children: navLabels.map((item, j) => {
						const subKey = index * 4 + j + 1;
						return {
							key: subKey,
							label: item(),
						};
					}),
				};
			},
		);


		return (
			<Layout>
				<AppHeader />

				<Content style={{ padding: '0 50px' }}>

					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>

					<Layout className="site-layout-background" style={{ padding: '24px 0' }}>

						<Sider className="site-layout-background" width={200}>
							<Menu
								mode="inline"
								defaultSelectedKeys={['1']}
								defaultOpenKeys={['sub1']}
								style={{ height: '100%' }}
								items={items2}
							/>
						</Sider>

						<Content style={{ padding: '0 24px', minHeight: 280 }}>
							
							<Switch>

								<Route exact path='/' render={ () => <Redirect to={"/profile"} /> }/>

								<Route path='/dialogs' render={withSuspense(DialogsContainer)}/>

								<Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>

								<Route path='/music' render={() => <Music/>}/>
								<Route path='/settings' render={() => <Settings/>}/>
								<Route path='/news' render={() => <News/>}/>

								<Route path='/users' render={() => <UsersPage pageTitle={'Самураи'} />}/>

								<Route path='/login' render={withSuspense(LoginPage)} />

								<Route path='*' render={ () => <div>404 Ошибка</div>} />

							</Switch>

						</Content>
					</Layout>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		);
	}
}

const mapStateToProps = (state:AppStateType) => {
	return {
		initialized: state.app.initialized,
	}
};

const AppContainer = compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, {initializeApp})
)(App);

const SamuraiJSApp:React.FC = () => {
	return <BrowserRouter>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</BrowserRouter>;
};

export default SamuraiJSApp;
