import React, { useRef, useState } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

const initialUsers = [
	{
		id: 1,
		username: 'velopert',
		email: 'public.velopert@gmail.com',
	},
	{
		id: 2,
		username: 'tester',
		email: 'tester@example.com',
	},
	{
		id: 3,
		username: 'liz',
		email: 'liz@example.com',
	},
];

function App() {
	const [inputs, setInputs] = useState({
		username: '',
		email: '',
	});

	const { username, email } = inputs;

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const [users, setUsers] = useState(initialUsers);

	const nextId = useRef(4);
	const onCreate = () => {
		const user = {
			id: nextId.current,
			username,
			email,
		};

		setUsers([...users, user]);
		// setUsers(users.concat(user));

		setInputs({
			username: '',
			email: '',
		});
		nextId.current += 1;
	};

	const onRemove = (id) => {
		setUsers(users.filter((user) => user.id !== id));
	};
	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList users={users} onRemove={onRemove} />
		</>
	);
}

export default App;
