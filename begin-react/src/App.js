import React, { useMemo, useReducer } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

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
			return {
				inputs: initialState.inputs,
				users: state.users.concat(action.user),
			};
		case 'TOGGLE_USER':
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.id ? { ...user, active: !user.active } : user
				),
			};
		case 'REMOVE_USER':
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.id),
			};
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
