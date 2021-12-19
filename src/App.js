import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import {addPost} from "./redux/state";





const App = (props) => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<Navbar state={props.state.sidebar.friends} />
				{/*<Profile/>*/}
				<div className="app-wrapper-content">
					{/*<Route path='/dialogs' component={Dialogs} />*/}
					{/*<Route path='/profile' component={Profile} />*/}
					{/*<Route path='/music' component={Music} />*/}
					{/*<Route path='/settings' component={Settings} />*/}
					{/*<Route path='/news' component={News} />*/}

					<Route path='/dialogs' render={ () =>
						<Dialogs dialogsPage={props.state.dialogsPage}
										 addMessage={props.addMessage}
										 updateNewMessageChange={props.updateNewMessageChange}/>} />

					<Route path='/profile' render={ () =>
						<Profile profilePage={props.state.profilePage}
										 addPost={props.addPost}
										 updateNewPostChange={props.updateNewPostChange}/>} />

					<Route path='/music' render={ () => <Music />} />
					<Route path='/settings' render={ () => <Settings />} />
					<Route path='/news' render={ () => <News />} />
				</div>
			</div>
		</BrowserRouter>
  );
};





export default App;
