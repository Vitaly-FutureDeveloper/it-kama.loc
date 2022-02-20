import React from "react";
import Profile from "./Profile";
import {getProfile, getStatus, setUsersProfile, updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



class ProfileContainer extends React.Component {

	componentDidMount() {
		const userId = this.props.match.params.userId || 2;
		this.props.getProfile(userId);
		this.props.getStatus(userId);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status,
			});
		}
	}

	render() {
		return (
			<Profile {...this.props}
							 profile={this.props.profile}
							 status={this.props.status}
							 updateStatus={this.props.updateStatus}
			/>
		);
	}
}


const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
});

const mapStateToDispatch = {
	setUsersProfile,
	getProfile,
	getStatus,
	updateStatus,
};

export default compose(
	connect(mapStateToProps, mapStateToDispatch),
	withRouter,
	withAuthRedirect
)(ProfileContainer);