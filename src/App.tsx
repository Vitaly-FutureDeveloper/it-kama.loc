import React from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {BrowserRouter, Redirect, Route, withRouter, Switch} from "react-router-dom";

import store, {AppStateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import {withSuspense} from "./hoc/withSuspense";

import './App.css'; // global styles
import Navbar from "./components/Navbar/Navbar";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Spinner from "./components/common/spinners/spinner";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./Login/Login"));


type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	initializeApp: () => void,
};

class App extends React.Component<MapPropsType & DispatchPropsType> {

	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		alert('какая-то ошибка');
		// console.warn(`unhandledRejection: ${promise}`);
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


		return (
			<div className='app-wrapper'>
				<HeaderContainer/>
				<Navbar/>
				{/*<Profile/>*/}
				<div className="app-wrapper-content">

					<Switch>

					<Route exact path='/' render={ () => <Redirect to={"/profile"} /> }/>

					<Route path='/dialogs' render={withSuspense(DialogsContainer)}/>

					<Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>

					<Route path='/music' render={() => <Music/>}/>
					<Route path='/settings' render={() => <Settings/>}/>
					<Route path='/news' render={() => <News/>}/>

					<Route path='/users' render={() => <UsersContainer />}/>

					<Route path='/login' render={withSuspense(Login)} />

					<Route path='*' render={ () => <div>404 Ошибка</div>} />

					</Switch>

				</div>
			</div>
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
