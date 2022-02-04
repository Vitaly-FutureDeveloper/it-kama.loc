import * as React from 'react';

import {addMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
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
		updateNewMessageBody: (body) => {
			const action = updateNewMessageBodyCreator(body);
			dispatch(action);
		},
		sendMessage: () => {
			const action = addMessageCreator();
			dispatch(action);
		},
	};
};


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);