import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);
	
	const activeMode = () => {
		setEditMode(true);
	};

	const deactiveMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	};

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	};

	return(
		<div>
			{ !editMode &&
				<div>
					<span onDoubleClick={activeMode}>{props.status || "---"}</span>
				</div>
			}
			{ editMode &&
				<div>
					<input onChange={onStatusChange}
								 onBlur={deactiveMode}
								 autoFocus={true}
								 value={status} />
				</div>
			}
		</div>
	);



};

export default ProfileStatusWithHooks;