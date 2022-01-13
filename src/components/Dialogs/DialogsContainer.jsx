import * as React from 'react';

import {addMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";




const mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogsPage,
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

// Вызовет Dialogs и передаст в props dialogsPage: "значение"
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;