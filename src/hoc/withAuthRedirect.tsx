import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";


const mapStateToPropsForRedirect = (state:AppStateType) => ({
	isAuth: state.auth.isAuth
} as MapStatePropsType);

type MapStatePropsType = {
	isAuth:boolean,
};
type MapDispatchPropsType = {};

export function withAuthRedirect <WCP>(WrappedComponent:React.ComponentType<WCP>) {

	const RedirectComponent:React.FC<WCP & MapStatePropsType> = (props) => {
		const {isAuth, ...restProps} = props;

		if (!isAuth) return <Redirect to={"/Login"}/>

		return <WrappedComponent {...restProps as unknown as WCP} />
	}

	return connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect,
		{})(RedirectComponent);
}