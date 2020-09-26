import { takeLatest, put, call, select, delay } from 'redux-saga/effects';
import {
  saveItem as localStorageSave,
  removeItem as localStorageRemove,
  getItem as localStorageGet,
} from '../../helpers/local-storage';
import { login as providerLogin, logout as providerLogout } from '../../providers/auth';
import {
  setSystemState as providerSetSystemState,
  getSystemState as providerGetSystemState,
} from '../../providers/app';

import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  NAVBAR_CLOSED,
  USER_LOGGED_ERROR,
  USER_CHECKAUTH,
  USER_CHECK,
  GET_SYS_STATE,
  SET_SYS_STATE,
  CHANGE_SYSTEM_STATE,
} from '../consts';

function* login({ login: email, password }) {
  try {
    const { token, refresh_token, user } = yield call(providerLogin, { password, email });
    if (!token) {
      throw new Error('auth response data error');
    }
    yield call(localStorageSave, 'auth', {
      token,
      login: email,
      refresh_token,
      user,
      key: 'reports',
    });
    document.cookie = `auth=${token}`;
    yield put({ type: USER_LOGGED_IN, payload: { token, login: email, ...user } });
  } catch (error) {
    const errStr = 'Неправильный логин или пароль';
    yield put({ type: USER_LOGGED_ERROR, payload: { authError: errStr } });
    console.error(error);
  }
}
function* logout() {
  try {
    yield put({ type: NAVBAR_CLOSED });
    const { login: email } = yield select((state) => state.user);
    yield call(providerLogout, { email });
  } catch (error) {
    console.error(error);
  } finally {
    yield call(localStorageRemove, 'auth');
    yield call(localStorageRemove, 'filters');
    yield put({ type: USER_LOGGED_OUT });
  }
}

function* check() {
  try {
    yield put({ type: USER_CHECK });
    const userData = yield call(localStorageGet, 'auth');
    yield delay(2000);
    if (userData && userData.key !== 'reports') {
      return yield put({ type: USER_LOGGED_OUT });
    }

    if (userData && userData.token) {
      yield put({
        type: USER_LOGGED_IN,
        payload: { login: userData.login, token: userData.token, ...userData.user },
      });
    } else if (!userData) {
      yield put({ type: USER_LOGGED_OUT });
    }
  } catch (error) {
    console.error(error);
  }
}

function* setSystemState({ payload }) {
  try {
    const { data } = yield call(providerSetSystemState, payload);

    const state = {
      importMode: {
        enableImportPopup: false,
      },
    };
    state.importMode.enableImportPopup = data['import']['enable-popup-import'];
    yield put({ type: CHANGE_SYSTEM_STATE, state });

    // yield call(getSystemState);
  } catch (err) {}
}

function* getSystemState() {
  try {
    const { data } = yield call(providerGetSystemState);
    const state = {
      importMode: {
        enableImportPopup: false,
      },
    };
    state.importMode.enableImportPopup = data['import']['enable-popup-import'];
    yield put({ type: CHANGE_SYSTEM_STATE, state });
  } catch (err) {}
}

export function* watchLogin() {
  yield takeLatest(USER_LOGIN, login);
}

export function* watchLogout() {
  yield takeLatest(USER_LOGOUT, logout);
}

export function* watchCheckAuth() {
  yield takeLatest(USER_CHECKAUTH, check);
}

export function* watchSetSystemState() {
  yield takeLatest(SET_SYS_STATE, setSystemState);
}

export function* watchGetSystemState() {
  yield takeLatest(GET_SYS_STATE, getSystemState);
}
