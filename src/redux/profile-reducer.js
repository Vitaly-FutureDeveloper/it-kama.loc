const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";


const initialState = {
	posts : [
		{id: "1", message: "How are you?", likeCount: "15"},
		{id: "2", message: "Хаваю, хаваю!", likeCount: "15"},
		{id: "3", message: "It's my first post", likeCount: "55"},
	],
	newPostText: 'it-kama',
};


const profileReducer = (state=initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			const newPost = {
				id: 5,
				message: state.newPostText,
				likesCount: 0,
			};

			return {
				...state,
				posts : [newPost, ...state.posts],
				newPostText : '',
			};
		}
		case
			UPDATE_NEW_POST_TEXT:{
				return {
					...state,
					newPostText : action.newText,
				};
			}
		default: {
			return state;
		}

	}

};


export const addPostCreator = () => ({ type: ADD_POST });
export const updateNewPostTextCreator = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text
});

export default profileReducer;