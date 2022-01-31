import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/Navbar";

import {BrowserRouter, Route} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


const App = (props) => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<HeaderContainer />
				<Navbar />
				{/*<Profile/>*/}
				<div className="app-wrapper-content">
					{/*<Route path='/dialogs' component={Dialogs} />*/}
					{/*<Route path='/profile' component={Profile} />*/}
					{/*<Route path='/music' component={Music} />*/}
					{/*<Route path='/settings' component={Settings} />*/}
					{/*<Route path='/news' component={News} />*/}

					<Route path='/dialogs' render={ () =>
						<DialogsContainer  />} />

					<Route path='/profile/:userId?' render={ () =>
						<ProfileContainer  />} />

					<Route path='/music' render={ () => <Music />} />
					<Route path='/settings' render={ () => <Settings />} />
					<Route path='/news' render={ () => <News />} />

					<Route path='/users' render={ () => <UsersContainer />} />
				</div>
			</div>
		</BrowserRouter>
  );
};

export default App;
