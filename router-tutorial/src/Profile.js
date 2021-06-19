import React from 'react';

// 프로필에서 사용할 데이터
const profileData = {
	velopert: {
		name: '김민준',
		description: '프론트엔드 개발자',
	},
	zknock: {
		name: '길진혁',
		description: '프론트엔드 개발자',
	},
};

function Profile({ match }) {
	const { username } = match.params;
	const profile = profileData[username];
	if (!profile) {
		return <div>존재하지 않는 유저입니다.</div>;
	}
	return (
		<div>
			<h3>
				{username}({profile.name})
			</h3>
			<p>{profile.description}</p>
		</div>
	);
}

export default Profile;
