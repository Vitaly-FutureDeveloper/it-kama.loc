import * as React from 'react';
import {connect} from "react-redux";

import FriendsBlock from "./FriendsBlock";
import {AppStateType} from "../../../redux/redux-store";
import {FriendsType} from "../../../redux/sidebar-reducer";

type MapStatePropsType = {
	friends:Array<FriendsType>,
};

const mapStateToProps = (state:AppStateType):MapStatePropsType => {
	return {
		friends: state.sidebar.friends,
	};
};

const FriendsBlockContainer = connect(mapStateToProps, {})(FriendsBlock);

export default FriendsBlockContainer;