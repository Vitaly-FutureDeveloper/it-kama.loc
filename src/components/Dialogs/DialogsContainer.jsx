import * as React from 'react';

import {addMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";




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



//HOC
const DialogsRedirectComponent = withAuthRedirect(Dialogs);

// Вызовет Dialogs и передаст в props dialogsPage: "значение"
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsRedirectComponent);

export default DialogsContainer;