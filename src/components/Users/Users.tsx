import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/types";


type PropsType = {
	totalItemsCount:number,
	pageSize:number,
	currentPage:number,
	onPageChanged:(pageNumber:number)=>void,
	users:Array<UsersType>,
	followingInProgress:Array<number>,
	follow: (userId:number) => void,
	unfollow: (userId:number) => void,
};

const Users:React.FC<PropsType> = ({currentPage, onPageChanged, totalItemsCount,
								 pageSize, followingInProgress, users,
																		 follow, unfollow}) => {

	return (
		<div>

		<Paginator currentPage={currentPage}
							 onPageChanged={onPageChanged}
							 totalItemsCount={totalItemsCount}
							 pageSize={pageSize} />
		<div>
			{
				users.map((u) => <User user={u}
																		 followingInProgress={followingInProgress}
																		 key={u.id}
																		 follow={follow}
																		 unfollow={unfollow}

				/>)
			}
		</div>

	</div>
	);

};

export default Users;