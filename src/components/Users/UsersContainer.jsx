import React from "react";
import {connect} from "react-redux";
import {
	follow,
	setCurrentPage,
	toggleIsFetching,
	setUsers,
	setTotalUsersCount,
	unfollow
} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import Spinner from "../spinners/spinner";

class UsersContainer extends React.Component {

	getUsers = () => {
		axios.get(`https://social-network.samuraijs.com/api/1.0/users
		?page=${this.props.currentPage}&count=${this.props.pageSize}`).then((response) => {
			this.props.setUsers(response.data.items);
			this.props.setTotalUsersCount(response.data.totalCount);
			this.props.toggleIsFetching(false);
		});
	};

	componentDidMount() {
		this.props.toggleIsFetching(true);
		this.getUsers();
	}

	onPageChanged = (pageNumber) => {
		this.props.setCurrentPage(pageNumber);

		axios.get(`https://social-network.samuraijs.com/api/1.0/users
		?page=${pageNumber}&count=${this.props.pageSize}`).then((response) => {
			this.props.setUsers(response.data.items);
			this.props.toggleIsFetching(false);
		});
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
									follow={this.props.follow} />
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
	};
};
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		follow: (userId) => {
// 			dispatch(followAC(userId))
// 		},
// 		unfollow: (userId) => {
// 			dispatch(unfollowAC(userId))
// 		},
// 		setUsers: (userId) => {
// 			dispatch(setUsersAC(userId))
// 		},
// 		setCurrentPage: (pageNumber) => {
// 			dispatch(setCurrentPageAC(pageNumber))
// 		},
// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setUsersTotalCountAC(totalCount))
// 		},
// 		toggleIsFetching: (isFetching) => {
// 			dispatch(setIsFetchingAC(isFetching));
// 		}
// 	};
// };

const mapDispatchToProps = {
		follow,
		unfollow,
		setUsers,
		setCurrentPage,
		setTotalUsersCount,
		toggleIsFetching
};


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);