import React from "react";
import {connect} from "react-redux";
import {
	follow, getUsersThunkCreator,
	setCurrentPage,
	setUsers, togglefollowingProgress,
	unfollow
} from "../../redux/users-reducer";

import Users from "./Users";
import Spinner from "../common/spinners/spinner";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalItemsCount,
	getUsers
} from "../../redux/users-selectors";



class UsersContainer extends React.Component {

	componentDidMount() {
		const {currentPage, pageSize} = this.props;
		this.props.getUsersThunkCreator(currentPage, pageSize);
	}

	onPageChanged = (pageNumber) => {
		const {pageSize} = this.props;
		this.props.getUsersThunkCreator(pageNumber, pageSize);
	}

	render(){
		return <>
			{this.props.isFetching && <Spinner />}
						<Users totalItemsCount={this.props.totalItemsCount}
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
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalItemsCount: getTotalItemsCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
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