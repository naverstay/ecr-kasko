export default function plural(forms, n) {
	let idx;
	if (n % 10 === 1 && n % 100 !== 11) {
		idx = 0; // many
	} else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
		idx = 1; // few
	} else {
		idx = 2; // one
	}
	return forms[idx] || '';
}
