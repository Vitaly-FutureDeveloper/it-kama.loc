import React from "react";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

import Header, {DispatchPropsType, MapPropsType} from "./Header";
import {logout} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component<MapPropsType> {

	render() {
		return <Header {...this.props} />;
	}
};

const mapStateToProps = (state:AppStateType) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
} as MapPropsType);

export default compose<React.ComponentType>(
	withRouter,
	connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,
	{ logout } ))(HeaderContainer);