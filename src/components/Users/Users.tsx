import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearcheForm/UsersSearchForm";
import {FilterType, getUsersThunkCreator} from "../../redux/users-reducer";
import {
	getCurrentPage,
	getFollowingInProgress,
	getPageSize,
	getTotalItemsCount,
	getUsers,
	getUsersFilter
} from "../../redux/users-selectors";
import { useHistory } from "react-router-dom";
import * as querystring from "querystring";


type PropsType = {

};

type QueryParamsType = { term?: string, page?: string, friend?: string };
export const Users:React.FC<PropsType> = (props) => {

	const users = useSelector(getUsers);
	const totalItemsCount = useSelector(getTotalItemsCount);
	const currentPage = useSelector(getCurrentPage);
	const pageSize = useSelector(getPageSize);
	const filter = useSelector(getUsersFilter);
	const followingInProgress = useSelector(getFollowingInProgress);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		// const {search} = history.location;
		const parsed = querystring.parse(history.location.search.substr(1)) as QueryParamsType;

		let actualPage = currentPage;
		let actualFilter = filter;

		if(!!parsed.page) actualPage = Number(parsed.page);

		if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};

		switch (parsed.friend) {
			case "null":
				actualFilter = {...actualFilter, friend: null}
				break;
			case "true":
				actualFilter = {...actualFilter, friend: true}
				break;
			case "false":
				actualFilter = {...actualFilter, friend: false}
				break;
		}
		dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
	}, []);

	useEffect(() => {
		const query: QueryParamsType = {};

		if(!!filter.term) query.term = filter.term;
		if(filter.friend !== null) query.friend = String(filter.friend);
		if(currentPage !== 1) query.page = String(currentPage);

		history.push({
			pathname: "/users",
			search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
		});
	}, [filter, currentPage]);

	const onPageChanged = (pageNumber:number) => {
		dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
	};
	const onFilterChanged = (filter:FilterType) => {
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