import React from "react";
import Profile from "./Profile";
import {getProfile, setUsersProfile} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";



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

const withAuthRedirectComponent = withAuthRedirect(ProfileContainer);

const WithRouterDataContainerComponent = withRouter(withAuthRedirectComponent);

export default connect(mapStateToProps, {setUsersProfile, getProfile})(WithRouterDataContainerComponent);

