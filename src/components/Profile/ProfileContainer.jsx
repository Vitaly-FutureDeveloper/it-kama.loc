import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import {setUsersProfile} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";



class ProfileContainer extends React.Component {

	componentDidMount() {
		const userId = this.props.match.params.userId || 2;
		axios.get(`https://social-network.samuraijs.com/api/1.0/
		profile/${userId}`).then((response) => {
			this.props.setUsersProfile(response.data);
		});
	}

	render() {
		return (
			<Profile {...this.props} profile={this.props.profile} />
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
});

const WithRouterDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUsersProfile})(WithRouterDataContainerComponent);

