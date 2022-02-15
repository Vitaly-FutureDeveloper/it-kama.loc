import React from "react";
import {connect} from "react-redux";
import {
	follow, getUsersThunkCreator,
	setCurrentPage,
	setUsers, togglefollowingProgress,
	unfollow
} from "../../redux/users-reducer";

import Users from "./Users";
import Spinner from "../spinners/spinner";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



class UsersContainer extends React.Component {


	componentDidMount() {
		const currentPage = this.props.currentPage;
		const pageSize = this.props.pageSize;
		this.props.getUsersThunkCreator(currentPage, pageSize);

		// this.props.toggleIsFetching(true);
		//
		// usersAPI.getUsers(currentPage, pageSize).then((data) => {
		// 	this.props.setUsers(data.items);
		// 	this.props.setTotalUsersCount(data.totalCount);
		// 	this.props.toggleIsFetching(false);
		// });
	}

	onPageChanged = (pageNumber) => {
		const pageSize = this.props.pageSize;
		this.props.getUsersThunkCreator(pageNumber, pageSize);
		// this.props.setCurrentPage(pageNumber);
		// this.props.toggleIsFetching(true);
		//
		// usersAPI.getUsers(pageNumber, pageSize).then((data) => {
		// 	this.props.setUsers(data.items);
		// 	this.props.toggleIsFetching(false);
		// });
	}

	render(){
		return <>
			{this.props.isFetching && <Spinner />}
						<Users totalUsersCount={this.props.totalUsersCount}
									pageSize={this.props.pageSize}
									currentPage={this.props.currentPage}
									onPageChanged={this.onPageChanged}
									users={this.props.users}
									unfollow={this.props.unfollow}
									follow={this.props.follow}
									followingInProgress={this.props.followingInProgress}/>
						</>
	}

}

const mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress
	};
};

const mapDispatchToProps = {
		follow,
		unfollow,
		setUsers,
		setCurrentPage,
		togglefollowingProgress,
	getUsersThunkCreator,
};


export default compose(
	withAuthRedirect,
	connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer);