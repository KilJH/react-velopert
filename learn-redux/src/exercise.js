import { createStore } from 'redux';

// createStore는 스토어를 만들어주는 함수입니다.
// 리액트 프로젝트에서는 단 하나의 스토어를 만듭니다.

// 리덕스에서 관리할 상태 정의
const initialState = {
	counter: 0,
	text: '',
	list: [],
};

// 액션 타입 정의
// 액션 타입은 주로 대문자로 작성
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

// 액션 생성함수 정의
// 액션 생성함수는 camelCase로 작성
const increase = () => ({ type: INCREASE });
const decrease = () => ({ type: DECREASE });
const changeText = (text) => ({ type: CHANGE_TEXT, text });
const addToList = (item) => ({ type: ADD_TO_LIST, item });

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만들어봅시다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 합니다!

function reducer(state = initialState, action) {
	// state의 초기값을 initialState로 지정
	switch (action.type) {
		case INCREASE:
			return { ...state, counter: state.counter + 1 };

		case DECREASE:
			return { ...state, counter: state.counter - 1 };
		case CHANGE_TEXT:
			return { ...state, text: action.text };
		case ADD_TO_LIST:
			return { ...state, list: state.list.concat(action.item) };
		default:
			return state;
	}
}

// 스토어 만들기
const store = createStore(reducer);

console.log(store.getState());

// 스토어 안에 들어있는 상태가 바뀔 때마다 호출되는 listener 함수
const listener = () => {
	const state = store.getState();
	console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubcribe()를 호출.

// 액션들을 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({ id: 1, text: '와우' }));
