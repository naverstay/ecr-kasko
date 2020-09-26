export function saveItem(key, value) {
	const strValue = JSON.stringify(value);
	localStorage.setItem(key, strValue);
}

export function getItem(key) {
	const strValue = localStorage.getItem(key);
	let value = null;
	if (strValue !== null) {
		value = { ...JSON.parse(strValue) };
	}
	return value;
}

export function removeItem(key) {
	localStorage.removeItem(key);
}
