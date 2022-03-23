import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/Navbar";

import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./Login/Login";
import React from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Spinner from "./components/common/spinners/spinner";
import store from "./redux/redux-store";


class App extends React.Component {

	componentDidMount() {
		this.props.initializeApp();
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
					{/*<Route path='/dialogs' component={Dialogs} />*/}
					{/*<Route path='/profile' component={Profile} />*/}
					{/*<Route path='/music' component={Music} />*/}
					{/*<Route path='/settings' component={Settings} />*/}
					{/*<Route path='/news' component={News} />*/}

					<Route path='/dialogs' render={() =>
						<DialogsContainer/>}/>

					<Route path='/profile/:userId?' render={() =>
						<ProfileContainer/>}/>

					<Route path='/music' render={() => <Music/>}/>
					<Route path='/settings' render={() => <Settings/>}/>
					<Route path='/news' render={() => <News/>}/>

					<Route path='/users' render={() => <UsersContainer/>}/>

					<Route path='/login' render={() => <Login/>}/>
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

const SamuraiJSApp = (props) => {
	return <BrowserRouter>
		<Provider store={store}>
			<AppContainer />
			{/*<App state={state}*/}
			{/*		 store={store}*/}
			{/*//		.bind(store)*/}
			{/*//		Для того чтоб, привязать контекст к store,*/}
			{/*//		Чтоб, когда мы обращаемся к props, this указывал*/}
			{/*// 		на store, а не к props*/}
			{/*		 dispatch={store.dispatch.bind(store)} />*/}
		</Provider>
	</BrowserRouter>;
};

export default SamuraiJSApp;
