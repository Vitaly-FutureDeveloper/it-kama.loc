import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {
	follow, getUsersThunkCreator,
	unfollow
} from "../../redux/users-reducer";

import Users from "./Users";
import Spinner from "../common/spinners/spinner";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
	getCurrentPage,
	getFollowingInProgress,
	getIsFetching,
	getPageSize,
	getTotalItemsCount,
	getUsers
} from "../../redux/users-selectors";
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
	currentPage:number,
	pageSize:number,
	isFetching:boolean,
	totalItemsCount:number,

	followingInProgress:Array<number>,
	users:Array<UsersType>,
};
type MapDispatchPropsType = {
	getUsersThunkCreator: (currentPage:number, pageSize:number) => void,
	follow: (userId:number) => void,
	unfollow: (userId:number) => void,
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {

	componentDidMount() {
		const {currentPage, pageSize} = this.props;
		this.props.getUsersThunkCreator(currentPage, pageSize);
	}

	onPageChanged = (pageNumber:number) => {
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



const mapStateToProps = (state:AppStateType):MapStatePropsType => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalItemsCount: getTotalItemsCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	};
};

const mapDispatchToProps:MapDispatchPropsType = {
	follow,
	unfollow,
	getUsersThunkCreator,
};


export default compose<React.ComponentType>(
	withAuthRedirect,
	connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer);