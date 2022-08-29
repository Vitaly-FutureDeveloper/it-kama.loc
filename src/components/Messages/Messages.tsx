import React from "react";

const Messages:React.FC = () => {
	return(
		<div className="dialogs">
			<div className="dialogs-items">
				<div className="dialog">
					Dima
				</div>
				<div className="dialog">
					Sasha
				</div>
				<div className="dialog">
					Masha
				</div>
				<div className="dialog">
					Lena
				</div>
				<div className="dialog">
					Pasha
				</div>
				<div className="dialog">
					Dasha
				</div>
			</div>

			<div className="messages">
				<div className="massage">Hi</div>
				<div className="massage">Yuo</div>
				<div className="massage">How are you?</div>
			</div>
		</div>
	)
}

export default Messages;