export type FriendsType = {
	id:number,
	name:string,
};
const initialState = {
	friends : [
		{id: 1, name: "Саня",},
		{id: 2, name: "Алекс",},
		{id: 3, name: "Шурик",},
	] as Array<FriendsType>,
};

type InitialStateType = typeof initialState;
const sidebarReducer = (state=initialState, action:any):InitialStateType => {

	return state;
}

export default sidebarReducer;