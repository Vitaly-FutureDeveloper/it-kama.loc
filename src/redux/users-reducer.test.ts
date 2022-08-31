import usersReducer, {actions, InitialStateType} from "./users-reducer";
import {UsersType} from "../types/types";

let state: InitialStateType;

beforeEach(() =>{
	state = {
		users : [
			{id: 0, name: 'Vitas 0', followed: false, status: "status 0", photos: {small: 'small 0', large: 'large 0'}},
			{id: 1, name: 'Vitas 1', followed: false, status: "status 1", photos: {small: 'small 1', large: 'large 1'}},
			{id: 2, name: 'Vitas 2', followed: false, status: "status 2", photos: {small: 'small 2', large: 'large 2'}},
			{id: 3, name: 'Vitas 3', followed: false, status: "status 3", photos: {small: 'small 3', large: 'large 3'}},
		] as Array<UsersType>,
		pageSize: 50,
		totalUsersCount: 0,
		currentPage: 1,
		isFetching: false,
		followingInProgress: [] as Array<number>,
	};
});

describe("Users Reducer action Creators", () => {
	test("Follow success", () => {
		const newState = usersReducer(state, actions.followSuccess(1))

		expect(newState.users[0].followed).toBeFalsy();
		expect(newState.users[1].followed).toBeTruthy();
	});

	test("UNFollow success", () => {
		const newState = usersReducer(state, actions.unfollowSuccess(3))

		expect(newState.users[2].followed).toBeTruthy();
		expect(newState.users[3].followed).toBeFalsy();
	});
});