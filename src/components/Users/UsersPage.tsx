import React from "react";
import {useSelector} from "react-redux";

import {Users} from "./Users";
import Spinner from "../common/spinners/spinner";
import {getIsFetching} from "../../redux/users-selectors";


type UsersPagePropsType = {
	pageTitle:string,
};
export const UsersPage:React.FC<UsersPagePropsType> = (props) => {
	const isFetching = useSelector(getIsFetching);

	return <>
		<h2>{props.pageTitle}</h2>
		{isFetching && <Spinner />}
		<Users />
	</>
};



