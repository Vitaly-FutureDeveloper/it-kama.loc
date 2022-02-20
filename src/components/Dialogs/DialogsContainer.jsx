import * as React from 'react';

import {addMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";




const mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage
	};
};

const mapDispatchToProps = (dispatch) => {
	return {

		sendMessage: (newMessageBody) => {
			const action = addMessageCreator(newMessageBody);
			dispatch(action);
		},
	};
};


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);