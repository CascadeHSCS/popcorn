let wordtree = require('./wordtree')

let console_wordtree = (from, to, delay) => {
	return wordtree(from, to, (step) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				process.stdout.write(`\r${step}`);
				resolve();
			},delay)
		 });
	}).then(() => process.stdout.write("\n"))
}

module.exports = console_wordtree;
