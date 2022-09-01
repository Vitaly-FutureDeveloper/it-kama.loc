import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/types";
import UsersSearchForm from "./UsersSearcheForm/UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";


type PropsType = {
	users:Array<UsersType>,
	totalItemsCount:number,
	pageSize:number,
	currentPage:number,
	onPageChanged:(pageNumber:number) => void,
	onFilterChanged:(filter:FilterType) => void,
	followingInProgress:Array<number>,
	follow: (userId:number) => void,
	unfollow: (userId:number) => void,
};

const Users:React.FC<PropsType> = ({currentPage, onPageChanged, totalItemsCount,
								 pageSize, followingInProgress, users,
																		 follow, unfollow, onFilterChanged}) => {

	return (
		<div>

			<UsersSearchForm onFilterChanged={onFilterChanged} />

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