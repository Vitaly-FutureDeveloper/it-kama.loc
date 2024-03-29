import React, {ChangeEvent, useEffect, useState} from "react";


type PropsType = {
	status:string,
	updateStatus: (status:string) => void,
};
const ProfileStatusWithHooks:React.FC<PropsType> = (props) => {
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

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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