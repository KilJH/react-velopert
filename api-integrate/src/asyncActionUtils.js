// 이 함수는 파라미터로 액션 타입과 Promise를 만들어주는 함수를 받아옵니다.

export default function createAsyncDispatcher(type, promiseFn) {
	// 성공, 실패에 대한 액션 타입 문자열
	const SUCCESS = `${type}_SUCCESS`;
	const ERROR = `${type}_ERROR`;

	async function actionHandler(dispatch, ...rest) {
		dispatch({ type }); // 요청 시작
		try {
			const data = await promiseFn(...rest);
			dispatch({ type: SUCCESS, data });
		} catch (e) {
			dispatch({ type: ERROR, error: e });
		}
	}

	return actionHandler;
}

// UsersContext의 기본값
export const initialAsyncState = {
	loading: false,
	data: null,
	error: null,
};

// 로딩중일 때 바뀔 상태 객체
const loadingState = {
	loading: true,
	data: null,
	error: null,
};

// 성공했을 때 상태 만들어주는 함수
const success = (data) => ({
	loading: false,
	data,
	error: null,
});

// 실패했을 때의 상태 만들어주는 함수
const error = (error) => ({
	loading: false,
	data: null,
	error: error,
});

// 세가지 액션을 처리하는 리듀서를 만들어줍니다.
// type은 액션 타입, key는 리듀서를 사용할 필드 이름입니다. (ex. user, users)
export function createAsyncHandler(type, key) {
	// 성공, 실패에 대한 액션 타입 문자열
	const SUCCESS = `${type}_SUCCESS`;
	const ERROR = `${type}_ERROR`;

	// 함수를 새로 맹가노니
	function handler(state, action) {
		switch (action.type) {
			case type:
				return {
					...state,
					[key]: loadingState,
				};
			case SUCCESS:
				return {
					...state,
					[key]: success(action.data),
				};
			case ERROR:
				return {
					...state,
					[key]: error(action.error),
				};
			default:
				return state;
		}
	}

	return handler;
}
