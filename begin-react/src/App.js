import React, { useMemo, useReducer } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import produce from 'immer';

const initialState = {
	users: [
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com',
			active: true,
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com',
			active: false,
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com',
			active: false,
		},
	],
};

function countActiveUsers(users) {
	console.log('활성 사용자 수를 세는중...');
	return users.filter((user) => user.active).length;
}

function reducer(state, action) {
	switch (action.type) {
		case 'CREATE_USER':
			return produce(state, (draft) => {
				draft.users.push(action.user);
			});
		case 'TOGGLE_USER':
			return produce(state, (draft) => {
				const user = draft.users.find((user) => user.id === action.id);
				user.active = !user.active;
			});
		case 'REMOVE_USER':
			return produce(state, (draft) => {
				const index = draft.users.findIndex((user) => user.id === action.id);
				draft.users.splice(index, 1);
			});
		default:
			return state;
	}
}

export const UserDispatch = React.createContext(null);

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { users } = state;

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		<UserDispatch.Provider value={dispatch}>
			<CreateUser />
			<UserList users={users} />
			<div>활성사용자 수 : {count}</div>
		</UserDispatch.Provider>
	);
}

export default App;

/*
state로 사용하다가 setter 함수를 여러번 사용해야하는 일이 발생하면
ex) 	setUsers(users => users.concat(user));
			setInputs({
  			username: '',
  			email: ''
			});

useReducer의 사용을 고려해보는 것이 좋음
*/
