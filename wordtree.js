let nextword = (from, to, replaceIndex) => {
	if(to == from) {
		return to;
	}
	let bounds = max(to.length, from.length) - 1
	replaceIndex = replaceIndex || Math.floor(Math.random() * bounds)

	if(to.length < from.length) {
		return nextword(from.slice(0, to.length), to)
	}

	if(replaceIndex > from.length + 1) {
		return nextword(from + " ", to, replaceIndex);
	}
	if(replaceIndex > from.length) {
		return from + to.charAt(replaceIndex)
	}
	if(replaceIndex > to.length + 1) {
		return nextword(from, to + " ", replaceIndex);
	}
	if(replaceIndex > to.length) {
		return to + from.charAt(replaceIndex)
	}
	while(to.charAt(replaceIndex) == from.charAt(replaceIndex)) {
		replaceIndex = (replaceIndex + 1) % (bounds + 1)
	}
	return from.slice(0,replaceIndex).concat(to.charAt(replaceIndex)).concat(from.slice(replaceIndex + 1));
}

let max = (a,b) => a > b ? a : b;

let wordtree = (from, to, stepFunction) => {
	let next = nextword(from, to);
	if(next == from) {
		return Promise.resolve(from)
	}
	return stepFunction(next)
	.then(wordtree.bind(null, next, to, stepFunction))
}

module.exports = wordtree