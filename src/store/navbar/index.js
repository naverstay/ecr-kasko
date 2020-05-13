import {
	NAVBAR_OPEN,
	NAVBAR_OPENED,
	NAVBAR_CLOSE,
	NAVBAR_CLOSED,
	NAVBAR_TOGGLE,
	NAVBAR_ACTIVE_CHANGED,
	NAVBAR_SET_ACTIVE,
	NAVBAR_FIRST_PANEL_OPENED,
	NAVBAR_FIRST_PANEL_CLOSED,
	NAVBAR_FIXED_TOGGLE,
	TOGGLE_APP_MODAL,
	CLOSE_SYS_POPUP,
	OPEN_SYS_POPUP,
	SET_STATE
} from '../consts';
const initState = {
	isOpen: false,
	activeNav: { name: '' },
	isFirstPanelOpen: false,
	isNavFixed: false,
	appModal: {
		title: '',
		content: '',
		visible: false,
		onModalOk: () => { },
		onModalEsc: () => { },
	},
	importState: false,
	brokenState: false,
	showStateModal: false,

	level0: [{ name: 'home', fid: "home", type: 'icon' }],
	level1: [{ fid: "home", type: 'text', title: 'ТЕКСТ' }],
	level2: [{ fid: "home", type: 'link', title: 'ТЕКСТ 01', to: '/01' }],

};

export default function (state = initState, action) {
	switch (action.type) {
		case OPEN_SYS_POPUP:
			return { ...state, ...action.payload };
		case CLOSE_SYS_POPUP:
			return { ...state, showStateModal: null };
		case NAVBAR_OPENED:
			return { ...state, isOpen: true };
		case NAVBAR_CLOSED:
			return { ...state, isOpen: false };
		case NAVBAR_ACTIVE_CHANGED:
			return { ...state, activeNav: action.payload };
		case NAVBAR_FIRST_PANEL_OPENED:
			return { ...state, isFirstPanelOpen: true };
		case NAVBAR_FIRST_PANEL_CLOSED:
			return { ...state, isFirstPanelOpen: false };
		case NAVBAR_FIXED_TOGGLE:
			return { ...state, isNavFixed: action.payload };
		case TOGGLE_APP_MODAL:
			return { ...state, appModal: action.modalState };
		default:
			return state;
	}
}

export function navbarOpen() {
	return {
		type: NAVBAR_OPEN,
	};
}

export function navbarClose() {
	return {
		type: NAVBAR_CLOSE,
	};
}

export function navbarToggle(isOpen) {
	return {
		type: NAVBAR_TOGGLE,
		isOpen,
	};
}

export function navbarSetActive(nav) {
	return {
		type: NAVBAR_SET_ACTIVE,
		nav,
	};
}

export function navbarFixToggle(isOpen) {	
	return {
		type: NAVBAR_FIXED_TOGGLE,
		payload: isOpen
	};
}

// TODO выпилить
export function navbarFpToggle(isOpen) {
	return {
		type: NAVBAR_FIXED_TOGGLE,
		payload: isOpen
	};
}

export function appModalToggle(modalState) {
	return {
		type: TOGGLE_APP_MODAL,
		modalState,
	};
}

export function closeSysPopup() {
	return {
		type: CLOSE_SYS_POPUP,
	};
}

export function openSysPopup(modalType) {
	return {
		type: OPEN_SYS_POPUP,
		modalType
	};
}