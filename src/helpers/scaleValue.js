const scaleValue = (value, from, to) => {
	let scale = (to[1] - to[0]) / (from[1] - from[0]);
	let capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
	return (capped * scale + to[0]);
}

export default scaleValue;
