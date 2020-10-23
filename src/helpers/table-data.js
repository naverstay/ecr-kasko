export const tableHeaderConverter = (
	headers,
	headersMap = { title: 'value', key: 'name', dataIndex: 'name' }
) => {
	const columns = headers.map(header => ({
		title: header[headersMap.title],
		key: header[headersMap.key],
		dataIndex: header[headersMap.dataIndex],
		width: '',
	}));
	return columns;
};

export const tableDataConverter = (keys, items) => {
	const converted = items
		.map(item => {
			return keys.reduce((acc, curr, i) => {
				acc[curr] = item[i];
				return acc;
			}, {});
		})
		.map((item, i) => ({ ...item, key: i }));
	return converted;
};

export const convertGroupingColumnsTable = (data, namesMap, itemsDecoMap) => {
	const clearItems = data.items;
	delete clearItems.other;

	let headers = Object.values(clearItems)
		.map(v => v[0])
		.reduce((acc, curr) => {
			const header = { title: curr[0] };
			const children = curr.slice(1).map(child => ({
				title: child,
				dataIndex: `${namesMap[curr[0]]}_${namesMap[child]}`,
				key: `${curr[0]}${child}`,
			}));
			header.children = children;
			acc.push(header);
			return acc;
		}, []);

	headers = [
		{
			title: data.headers[0].value,
			key: data.headers[0].name,
			dataIndex: data.headers[0].name,
		},
		...headers,
	];

	// без первого элемента, столбца
	// по количеству строк
	let rows = [];
	for (let i = 0; i < data.headers.length - 1; i++) {
		const headerValue = {};
		headerValue[data.headers[0].name] = data.headers[i + 1].value;
		rows.push([headerValue]);
	}

	Object.values(clearItems).forEach(a => {
		const parentKey = namesMap[a[0][0]];
		a.slice(1).forEach((b, i) => {
			const keys = Object.keys(b);
			const pko = keys.reduce((acc, key) => {
				acc[`${parentKey}_${key}`] = b[key];
				return acc;
			}, {});
			rows[i].push(pko);
		});
	});

	rows = rows.map((item, indx) => {
		return item.reduce((acc, curr) => ({ ...acc, ...curr }), { key: indx });
	});

	return { title: data.title, columns: headers, data: rows };
};

export const decor = (decorsMap, items, ext) => {
	items.forEach(item => {
		for (let key in item) {
			if (ext && !decorsMap[key]) {
				if (checkType(item[key])) {
					item[key] = `${item[key]}${decorsMap['*']}`;
				} else {
					item[key] = '-';
				}
			}

			if (!ext && decorsMap[key]) {
				if (checkType(item[key])) {
					item[key] = `${item[key]}${decorsMap[key]}`;
				} else {
					item[key] = '-';
				}
			}
		}
	});

	return items;
};

const checkType = val => {
	const type = Object.prototype.toString.call(val);
	return type === '[object String]' || type === '[object Number]';
};
