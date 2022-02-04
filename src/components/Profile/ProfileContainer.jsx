import React from "react";
import Profile from "./Profile";
import {getProfile, setUsersProfile} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



class ProfileContainer extends React.Component {

	componentDidMount() {
		const userId = this.props.match.params.userId || 2;
		this.props.getProfile(userId);
		// profileAPI.getProfile(userId).then((response) => {
		// 	this.props.setUsersProfile(response.data);
		// });
	}

	render() {
		return (
			<Profile {...this.props} profile={this.props.profile} />
		);
	}
}


const mapStateToProps = (state) => ({
	profile: state.profilePage.profile
});

export default compose(
	connect(mapStateToProps, {setUsersProfile, getProfile}),
	withRouter,
	withAuthRedirect
)(ProfileContainer);