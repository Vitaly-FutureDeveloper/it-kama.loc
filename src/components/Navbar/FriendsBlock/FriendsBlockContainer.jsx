import * as React from 'react';
import FriendsBlock from "./FriendsBlock";
import {connect} from "react-redux";

// const FriendsBlockContainer1 = (props) => {
// 	const state = store.getState().sidebar.friends;
// 	const friendElements = state.map((item) => <Friend friend={item} />);
//
// 	return <FriendsBlock />;
// };

const mapStateToProps = (state) =>{
	debugger;
	return {
		state: state.sidebar.friends,
	};
};
const mapDispatchToProps = (dispatch) =>{
	return {
		dispatch,
	};
};

const FriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsBlock);

export default FriendsBlockContainer;