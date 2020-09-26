import {
	USER_LOGGED_IN,
	USER_LOGGED_OUT,
	USER_LOGIN,
	USER_LOGOUT,
	USER_LOGGED_ERROR,
	USER_CHECKAUTH,
	USER_CHECK,
	CHANGE_LOCALE,
	GET_SYS_STATE,
	SET_SYS_STATE,
	CHANGE_SYSTEM_STATE
} from '../consts';

const initState = {
	isAuth: false,
	authWait: true,
	email: '',
	login: '',
	authError: '',
	locale: 'ru',
	langs: [
		{ label: 'Русский', value: 'ru' },
		{ label: 'English', value: 'en' }
	],
	id: 3575,
	first_name: '',
	last_name: "",
	middle_name: "",
	roles_bitmask: '',
	roles: [],
	permissions: [],
	dealers: [],
	rolesWeight: {
		'Менеджер по продажам': 0,
		'Кредитный специалист': 1,
		'РОП': 2,
		'Директор ДЦ': 2,
		'РОКС': 3,
		'Директор F&I': 3,
		'Администратор': 100
	},
	sysState: {
		importMode: {
			enableImportPopup: false
		}
	},
	// TODO временное решени для скачивания отчетов, выпилить!!!
	token: '',
};

export default function (state = initState, action) {
	switch (action.type) {
		case CHANGE_SYSTEM_STATE:
			return { ...state, sysState: {...action.state} };
		case CHANGE_LOCALE:
			return { ...state, locale: action.payload };
		case USER_LOGGED_OUT:
			return { ...initState, authWait: false };
		case USER_LOGGED_IN: {			
			return { ...state, isAuth: true, authError: '', authWait: false, ...action.payload };
		}
		case USER_LOGGED_ERROR:
			{
				const { authError } = action.payload;
				return { ...state, isAuth: false, authError };
			}
		case USER_CHECK:
			return { ...state, authWait: true };
		default:
			return state;
	}
}

export function userLogin({ login, password }) {
	return {
		type: USER_LOGIN,
		login,
		password,
	};
}

export function userLogout() {
	return {
		type: USER_LOGOUT,
	};
}

export function checkAuth() {
	return {
		type: USER_CHECKAUTH,
	};
}

export function changeLocale(locale) {
	return {
		type: CHANGE_LOCALE,
		payload: locale,
	};
}

export function setSysState(state) {
	return {
		type: SET_SYS_STATE,
		payload: state,
	};
}

export function getSysState() {
	return {
		type: GET_SYS_STATE,
	};
}

