import React, { useState } from 'react';

function InputSample() {
	const [inputs, setInputs] = useState({
		name: '',
		nickname: '',
	});

	const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const onReset = () => {
		setInputs({
			name: '',
			nickname: '',
		});
	};
	return (
		<div>
			<input placeholder='이름' name='name' onChange={onChange} value={name} />
			<input
				placeholder='닉네임'
				name='nickname'
				onChange={onChange}
				value={nickname}
			/>
			<button onClick={onReset}>초기화</button>
			<div>
				<b>값: </b>
				{name} ({nickname})
			</div>
		</div>
	);
}

export default InputSample;
