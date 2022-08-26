import './App.css'; // global styles
import Navbar from "./components/Navbar/Navbar";

import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
// import Login from "./Login/Login";
import React from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Spinner from "./components/common/spinners/spinner";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./Login/Login"));



class App extends React.Component {

	catchAllUnhandledErrors = (reason, promise) => {
		alert('какая-то ошибка');
		// console.warn(`unhandledRejection: ${promise}`);
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

					<switch>

					<Route exact path='/' render={ () => <Redirect to={"/profile"} /> }/>

					<Route path='/dialogs' render={withSuspense(DialogsContainer)}/>

					<Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>

					<Route path='/music' render={() => <Music/>}/>
					<Route path='/settings' render={() => <Settings/>}/>
					<Route path='/news' render={() => <News/>}/>

					<Route path='/users' render={() => <UsersContainer pageTitle={'Самурай'} />}/>

					<Route path='/login' render={withSuspense(Login)} />

					<Route path='*' render={ () => <div>404 Ошибка</div>} />

					</switch>

				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		initialized: state.app.initialized,
	}
};

const AppContainer = compose(
	withRouter,
	connect(mapStateToProps, {initializeApp})
)(App);

const SamuraiJSApp = () => {
	return <BrowserRouter>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</BrowserRouter>;
};

export default SamuraiJSApp;
