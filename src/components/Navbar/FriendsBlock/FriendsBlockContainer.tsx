import * as React from 'react';
import FriendsBlock from "./FriendsBlock";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {FriendsType} from "../../../redux/sidebar-reducer";

type MapStatePropsType = {
	friends:Array<FriendsType>,
};
type OwnProps = {
	pageTitle:string,
};

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
	return {
		friends: state.sidebar.friends,
	};
};
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		dispatch,
// 	};
// };

const FriendsBlockContainer = connect(mapStateToProps, {})(FriendsBlock);

export default FriendsBlockContainer;