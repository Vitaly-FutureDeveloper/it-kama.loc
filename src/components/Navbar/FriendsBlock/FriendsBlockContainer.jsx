import * as React from 'react';
import FriendsBlock from "./FriendsBlock";
import {connect} from "react-redux";



const mapStateToProps = (state) =>{
	return {
		friends: state.sidebar.friends,
	};
};
const mapDispatchToProps = (dispatch) =>{
	return {
		dispatch,
	};
};

const FriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsBlock);

export default FriendsBlockContainer;