import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, goToHome } from '../modules/posts';
import Post from '../components/Post';

function PostContainer({ postId }) {
	const { data, loading, error } = useSelector(
		(state) => state.posts.post[postId]
	) || {
		loading: false,
		data: null,
		error: null,
	}; // 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당이 오류나지 않도록
	const dispatch = useDispatch();

	useEffect(() => {
		if (data) return; // 포스트가 존재하면 아예 요청을 하지 않음
		dispatch(getPost(postId));
	}, [postId, dispatch, data]);

	if (loading) return <div>로딩중...</div>;
	// 요청은 하되 로딩중은 보여주지 않는 방식
	//  if (loading && !data) return <div>로딩중...</div>;
	if (error) return <div>에러 발생!</div>;
	if (!data) return null;

	return (
		<>
			<button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
			<Post post={data} />
		</>
	);
}

export default PostContainer;

// 데이터 캐싱을 위해서는 요청 자체를 하지않는 현재 방식
// 포스트정보가 바뀔 가능성이 있다면 요청은 하되 사용자경험을 위해 로딩중을 표시하지 않는 형태로 구현
