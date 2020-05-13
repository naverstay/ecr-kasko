import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';
import * as reducers from './reducers';
import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
	serialize: true,
});
const sagaMiddleware = createSagaMiddleware();

export default function() {
	/*
	const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  */

	const store = createStore(
		combineReducers(reducers),
		composeEnhancers(applyMiddleware(sagaMiddleware, loggerMiddleware))
	);
	sagaMiddleware.run(saga);

	return store;
}
