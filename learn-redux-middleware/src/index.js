import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : 'https://api.velog.io/';

const customHistory = createBrowserHistory();

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(
			ReduxThunk.withExtraArgument({ history: customHistory }),
			logger // logger는 항상 마지막에
		)
	)
);

ReactDOM.render(
	<Router history={customHistory}>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root')
);
