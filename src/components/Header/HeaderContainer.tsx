import React from "react";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

import Header, {DispatchPropsType, MapPropsType} from "./Header";
import {logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<MapPropsType> {

	render() {
		return <Header isAuth={this.props.isAuth}
									 login={this.props.login}
									 //@ts-ignore
									 logout={this.props.logout} />;
		// todo : fix logout TS2339: Property 'logout' does not exist on type 'Readonly '.
	}
};

const mapStateToProps = (state:AppStateType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
} as MapPropsType);

const mapDispatchToProps:DispatchPropsType = ({
	logout,
});

export default compose<React.ComponentType>(
	withRouter,
	connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,
		mapDispatchToProps ))(HeaderContainer);