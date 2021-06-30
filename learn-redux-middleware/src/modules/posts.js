import * as postsAPI from '../api/posts'; // 모두 불러오기
import {
	createPromiseThunk,
	createPromiseThunkById,
	handleAsyncActions,
	handleAsyncActionsById,
	reducerUtils,
} from '../lib/asyncUtils';

// action type
// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

// 포스트 비우기
const CLEAR_POST = 'CLEAR_POST';

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
	posts: reducerUtils.initial(),
	post: {},
};

export default function posts(state = initialState, action) {
	switch (action.type) {
		case GET_POSTS:
		case GET_POSTS_SUCCESS:
		case GET_POSTS_ERROR:
			return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
		case GET_POST:
		case GET_POST_SUCCESS:
		case GET_POST_ERROR:
			return handleAsyncActionsById(GET_POST, 'post')(state, action);
		// 요청은 하되 로딩중은 보여주지 않는 방식
		// return handleAsyncActionsById(GET_POST, 'post', true)(state, action);
		case CLEAR_POST:
			return {
				...state,
				post: reducerUtils.initial(),
			};
		default:
			return state;
	}
}
