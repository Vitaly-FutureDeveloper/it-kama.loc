import {actions, follow, getUsersThunkCreator, unfollow} from "./users-reducer";
import {usersAPI} from "../api/UsersAPI";
import {GetItemsType, ResponseType, ResultCodesEnum} from "../api/api";

jest.mock("../api/UsersAPI");
//@ts-ignore
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const resultFollowUnfollow: ResponseType = {
	resultCode: ResultCodesEnum.Success,
	messages: [],
	data: {},
};
const resultGetUsers: GetItemsType = {
	items: [
		{id: 0, name: 'Vitas 0', followed: false, status: "status 0", photos: {small: 'small 0', large: 'large 0'}},
		{id: 1, name: 'Vitas 1', followed: false, status: "status 1", photos: {small: 'small 1', large: 'large 1'}},
		{id: 2, name: 'Vitas 2', followed: false, status: "status 2", photos: {small: 'small 2', large: 'large 2'}},
		{id: 3, name: 'Vitas 3', followed: false, status: "status 3", photos: {small: 'small 3', large: 'large 3'}},
	],
	totalCount: 20,
	error: null,
};

const dispaptchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
	dispaptchMock.mockClear();
	getStateMock.mockClear();
	usersAPIMock.follow.mockClear();
	usersAPIMock.unfollow.mockClear();
	usersAPIMock.getUsers.mockClear();
});




describe("Users Thunks", () => {
	const USER_ID = 1;

	test("success follow thunk", async () => {
		const thunk = follow(USER_ID);
		usersAPIMock.follow.mockReturnValue(Promise.resolve(resultFollowUnfollow));

		await thunk(dispaptchMock, getStateMock, {});
		expect(dispaptchMock).toBeCalledTimes(3);
		expect(dispaptchMock).toHaveBeenNthCalledWith(1, actions.togglefollowingProgress(true, USER_ID));
		expect(dispaptchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(USER_ID));
		expect(dispaptchMock).toHaveBeenNthCalledWith(3, actions.togglefollowingProgress(false, USER_ID));
	});

	test("success unfollow thunk", async () => {
		const thunk = unfollow(USER_ID);
		usersAPIMock.unfollow.mockReturnValue(Promise.resolve(resultFollowUnfollow));

		await thunk(dispaptchMock, getStateMock, {});
		expect(dispaptchMock).toBeCalledTimes(3);
		expect(dispaptchMock).toHaveBeenNthCalledWith(1, actions.togglefollowingProgress(true, USER_ID));
		expect(dispaptchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(USER_ID));
		expect(dispaptchMock).toHaveBeenNthCalledWith(3, actions.togglefollowingProgress(false, USER_ID));
	});

	test("success getUsersThunkCreator thunk", async () => {
		const CURRENT_PAGE = 1;

		const thunk = getUsersThunkCreator(CURRENT_PAGE, 20);
		usersAPIMock.getUsers.mockReturnValue(Promise.resolve(resultGetUsers));

		await thunk(dispaptchMock, getStateMock, {});
		expect(dispaptchMock).toBeCalledTimes(5);
		expect(dispaptchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFetching(true));
		expect(dispaptchMock).toHaveBeenNthCalledWith(2, actions.setCurrentPage(CURRENT_PAGE));
		expect(dispaptchMock).toHaveBeenNthCalledWith(3, actions.setUsers(resultGetUsers.items));
		expect(dispaptchMock).toHaveBeenNthCalledWith(4, actions.setTotalUsersCount(20));
		expect(dispaptchMock).toHaveBeenNthCalledWith(5, actions.toggleIsFetching(false));
	});
});
