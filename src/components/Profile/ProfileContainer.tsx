import React from "react";
import Profile from "./Profile";

import {
	getProfile,
	getStatus,
	savePhoto,
	saveProfile,
	actions,
	updateStatus
} from "../../redux/profile-reducer";

import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {ProfileType, UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
	profile:ProfileType,
	status:string,
	autorizedUserId:boolean,
	isAuth:boolean,

};
type MapDispatchPropsType = {
	getProfile: (userId:number) => void,
	saveProfile: (profile:ProfileType) => void,
	getStatus: (status:number) => any,
	updateStatus: (status:string) => void,
	savePhoto: (file:File) => void,
};
type OwnProps = {
	pageTitle:string,
	match: any,
	history: any,
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps;
class ProfileContainer extends React.Component<PropsType> {

	refreshProfile(){
		// const userId = this.props.match.params.userId || this.props.autorizedUserId;
		let userId = this.props.match.params.userId;
		if (!userId){
			userId = this.props.autorizedUserId;
			if (!userId) {
				this.props.history.push("/login");
			}
		}
		this.props.getProfile(userId);
		this.props.getStatus(userId);
	}

	componentDidMount() {
		this.refreshProfile();
	}

	componentDidUpdate(prevProps:PropsType, prevState:MapStatePropsType) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {
			this.refreshProfile();
		}
	}


	render() {
		return (
			<Profile {...this.props}
							isOwner={!this.props.match.params.userId}
							 profile={this.props.profile}
							 status={this.props.status}
							 updateStatus={this.props.updateStatus}
							 savePhoto={this.props.savePhoto}
			/>
		);
	}
}


const mapStateToProps = (state:AppStateType) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	autorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth,
});

const mapStateToDispatch:MapDispatchPropsType = {
	getProfile,
	getStatus,
	saveProfile,
	updateStatus,
	savePhoto,
};

export default compose(
	connect(mapStateToProps, mapStateToDispatch),
	withRouter,
	// withAuthRedirect
)(ProfileContainer);