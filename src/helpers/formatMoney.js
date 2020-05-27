export const formatMoney = (number, thousand_spacer) => {
	return parseFloat((number + '').replace(/\D/g, '')).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&' + (thousand_spacer || ' ')).replace(/.00$/, '');
}
