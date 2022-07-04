import React from "react";
import Profile from "./Profile";
import {getProfile, getStatus, savePhoto, saveProfile, setUsersProfile, updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



class ProfileContainer extends React.Component {

	refreshProfile(){
		const userId = this.props.match.params.userId || this.props.autorizedUserId;
		if (!userId){
			this.props.history.push("/login");
		}
		this.props.getProfile(userId);
		// this.props.getStatus(userId);
	}

	componentDidMount() {
		this.refreshProfile();
		// const userId = this.props.match.params.userId || this.props.autorizedUserId;
		// if (!userId){
		// 	this.props.history.push("/login");
		// }
		// this.props.getProfile(userId);
		// this.props.getStatus(userId);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {
			this.refreshProfile();
		}

		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status,
			});
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


const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	autorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth,
});

const mapStateToDispatch = {
	setUsersProfile,
	getProfile,
	saveProfile,
	getStatus,
	updateStatus,
	savePhoto,
};

export default compose(
	connect(mapStateToProps, mapStateToDispatch),
	withRouter,
	withAuthRedirect
)(ProfileContainer);