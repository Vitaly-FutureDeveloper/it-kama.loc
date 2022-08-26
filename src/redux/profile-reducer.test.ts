import profileReducer, {actions, initialState} from "./profile-reducer";


// const state = {
// 	posts : [
// 		{id: "1", message: "How are you?", likeCount: "15"},
// 		{id: "2", message: "Хаваю, хаваю!", likeCount: "15"},
// 		{id: "3", message: "It's my first post", likeCount: "55"},
// 	],
// 	status: '',
// 	newPostText: '',
// 	profile: null,
// };
const state = initialState;

describe("Profile status component", () => {
	test('Lenght of posts should be incremented', () => {
		// 1. Тестовые данные
		const action = actions.addPostCreator("It test post");

		// 2. Action
		const newState = profileReducer(state, action);

		// 3. extraction
		expect(newState.posts.length).toBe(4);
	});

	test('Message of new posts should be correct', () => {
		// 1. Тестовые данные
		const action = actions.addPostCreator("It test post");

		// 2. Action
		const newState = profileReducer(state, action);

		// 3. extraction
		expect(newState.posts[0].message).toBe("It test post");
	});

	test('after deleting lenght of messages should be incremented', () => {
		// 1. Тестовые данные
		const action = actions.deletePost(1);

		// 2. Action
		const newState = profileReducer(state, action);

		// 3. extraction
		expect(newState.posts.length).toBe(2);
	});

	test(`after deleting lenght shouldn't be decrement if id is incorrect`, () => {
		// 1. Тестовые данные
		const action = actions.deletePost(1000);

		// 2. Action
		const newState = profileReducer(state, action);

		// 3. extraction
		expect(newState.posts.length).toBe(3);
	});
});

