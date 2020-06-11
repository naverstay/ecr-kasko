function searchTree (element, target) {
	if (!element || !target) return null;
	if (element.isEqualNode(target)) {
		return element;
	} else if (element.children != null) {
		let i;
		let result = null;
		for (i = 0; result == null && i < element.children.length; i++) {
			result = searchTree(element.children[i], target);
		}
		return result;
	}
	return null;
}

export default searchTree;
