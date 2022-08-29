import * as React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Dialogs from "./Dialogs";

import {withAuthRedirect} from "../../hoc/withAuthRedirect";

import {AppStateType} from "../../redux/redux-store";


type MapDispatchPropsType = {
	sendMessage: (newMessageBody:string) => void,
};

const mapStateToProps = (state:AppStateType) => {
	return {
		dialogsPage: state.dialogsPage
	};
};

// const mapDispatchToProps:MapDispatchPropsType =  {
// 	sendMessage: (newMessageBody) => {
// 		debugger
// 		actions.sendMessage(newMessageBody);
// 	},
// };


export default compose<React.ComponentType>(
	connect(mapStateToProps),
	withAuthRedirect
)(Dialogs);