import { takeLatest, call, delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import {
	NAVBAR_OPEN,
	NAVBAR_OPENED,
	NAVBAR_CLOSE,
	NAVBAR_CLOSED,
	NAVBAR_TOGGLE,
	NAVBAR_SET_ACTIVE,
	NAVBAR_ACTIVE_CHANGED,
} from '../consts';

function* open() {
	yield call(close);
	yield delay(100); // animation
	yield put({ type: NAVBAR_OPENED });
}
function* close() {
	yield delay(100); // animation
	yield put({ type: NAVBAR_CLOSED });
}
function* toggle({ isOpen }) {
	if (isOpen) {
		yield call(close);
	} else {
		yield call(open);
	}
}

function* setActive({ nav }) {
	yield put({ type: NAVBAR_ACTIVE_CHANGED, payload: nav });
}

export function* watchNavbarOpen() {
	yield takeLatest(NAVBAR_OPEN, open);
}

export function* watchNavbarClose() {
	yield takeLatest(NAVBAR_CLOSE, close);
}

export function* watchNavbarToggle() {
	yield takeLatest(NAVBAR_TOGGLE, toggle);
}

export function* watchNavbarSetActive() {
	yield takeLatest(NAVBAR_SET_ACTIVE, setActive);
}
