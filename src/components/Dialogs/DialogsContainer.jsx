import * as React from 'react';

import {addMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = (props) => {

	return (
		<StoreContext.Consumer>
			{
				(store) => {
					const state = store.getState().dialogsPage;

					const addMessage = () => {
						const action = addMessageCreator();
						store.dispatch(action);
					};
					const onNewMessageText = (body) => {
						const action = updateNewMessageBodyCreator(body);

						store.dispatch(action);
					}


					return <Dialogs updateNewMessageBody={onNewMessageText}
									 sendMessage={addMessage}
									 dialogsPage={state} />
				}
			}
		</StoreContext.Consumer>
	);
};

export default DialogsContainer;