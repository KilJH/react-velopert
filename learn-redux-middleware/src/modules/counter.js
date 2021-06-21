// type
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// action generator
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// initial value
const initialState = 0;

// reducer
export default function counter(state = initialState, action) {
	switch (action.type) {
		case INCREASE:
			return state + 1;
		case DECREASE:
			return state - 1;
		default:
			return state;
	}
}
