import uuidv4 from 'uuid/v4';

export const addKeys = (arr, key) => {
	if (!Array.isArray(arr)) {
		return [];
	}
	return arr.map((item, index) => {
		if (!key) {
			return { ...item, key: `${uuidv4()}` };
		}

		return { ...item, key: `${item[key]}${uuidv4()}` };
	});
}

export const addColumnClass = (arr, className = '', index = 0) => {
	const data = [...arr];
	data[index] = { ...data[index], className };

	return data;
}
