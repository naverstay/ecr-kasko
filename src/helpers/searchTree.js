function searchTree (element, target) {
	//console.log('element, target', element, target);
	if (!element || !target) return null;

	try {
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
	} catch (e) {
		
	}
	
	return null;
}

export default searchTree;
