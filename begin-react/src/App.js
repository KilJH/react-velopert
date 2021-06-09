import React, { useRef, useMemo, useCallback, useReducer } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './hooks/useInputs';

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

function App() {
	const [{ username, email }, onChange, reset] = useInputs({
		username: '',
		email: '',
	});
	const [state, dispatch] = useReducer(reducer, initialState);
	const nextId = useRef(4);

	const { users } = state;

	const onCreate = useCallback(() => {
		dispatch({
			type: 'CREATE_USER',
			user: {
				id: nextId.current,
				username,
				email,
			},
		});
		nextId.current += 1;
		reset();
	}, [username, email, reset]);

	const onToggle = useCallback((id) => {
		dispatch({
			type: 'TOGGLE_USER',
			id,
		});
	}, []);

	const onRemove = useCallback((id) => {
		dispatch({
			type: 'REMOVE_USER',
			id,
		});
	}, []);

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList users={users} onToggle={onToggle} onRemove={onRemove} />
			<div>활성사용자 수 : {count}</div>
		</>
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
