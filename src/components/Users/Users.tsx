import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearcheForm/UsersSearchForm";
import {getUsersThunkCreator} from "../../redux/users-reducer";
import {
	getCurrentPage,
	getFollowingInProgress,
	getPageSize,
	getTotalItemsCount,
	getUsers,
	getUsersFilter
} from "../../redux/users-selectors";


type PropsType = {

};

export const Users:React.FC<PropsType> = (props) => {

	const users = useSelector(getUsers);
	const totalItemsCount = useSelector(getTotalItemsCount);
	const currentPage = useSelector(getCurrentPage);
	const pageSize = useSelector(getPageSize);
	const filter = useSelector(getUsersFilter);
	const followingInProgress = useSelector(getFollowingInProgress);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
	}, []);

	const onPageChanged = (pageNumber:number) => {
		dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
	};
	const onFilterChanged = () => {
		dispatch(getUsersThunkCreator(1, pageSize, filter));
	};

	const follow = (userId:number) => {
		dispatch(follow(userId));
	};
	const unfollow = (userId:number) => {
		dispatch(unfollow(userId));
	};

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