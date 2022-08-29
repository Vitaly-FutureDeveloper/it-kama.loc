import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";

import {getProfile,
	getStatus,
	savePhoto,
	saveProfile,
	updateStatus} from "../../redux/profile-reducer";

import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

import Profile from "./Profile";



type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
	getProfile: (userId:number) => void,
	saveProfile: (profile:ProfileType) => any,
	getStatus: (userId:number) => void,
	updateStatus: (status:string) => void,
	savePhoto: (file:File) => void,
};
type OwnProps = {
	pageTitle:string,
};
type PathParamsType = {
	userId: string,
};

type PropsType = MapStatePropsType
	& MapDispatchPropsType
	& OwnProps
	& RouteComponentProps<PathParamsType>;
class ProfileContainer extends React.Component<PropsType> {

	refreshProfile(){
		// const userId = this.props.match.params.userId || this.props.autorizedUserId;
		let userId:number|null = +this.props.match.params.userId;
		if (!userId){
			userId = this.props.autorizedUserId;
			if (!userId) {
				// todo: may be replace push with Redirect
				this.props.history.push("/login");
			}
		}
		if (!userId){
			console.error("ID должен существовать в параметрах URI или в state");
		} else {
			this.props.getProfile(userId as number);
			this.props.getStatus(userId as number);
		}
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
							 profile={this.props.profile as ProfileType}
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

export default compose<React.ComponentType>(
	connect(mapStateToProps, mapStateToDispatch),
	withRouter,
	// withAuthRedirect
)(ProfileContainer);