import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({currentPage, onPageChanged, totalUsersCount,
								 pageSize, followingInProgress, ...props}) => {

	return (
		<div>

		<Paginator currentPage={currentPage}
							 onPageChanged={onPageChanged}
							 totalUsersCount={totalUsersCount}
							 pageSize={pageSize} />
		<div>
			{
				props.users.map((u) => <User user={u}
																		 followingInProgress={followingInProgress}
																		 key={u.id}
																		 follow={props.follow}
																		 unfollow={props.unfollow}

				/>)
			}
		</div>

	</div>
	);

};

export default Users;