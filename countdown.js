const cd = (countdown, stepFunction) => {
	if(countdown < 1) {
		return Promise.resolve();
	}
	return stepFunction(countdown)
	.then(cd.bind(null, countdown - 1, stepFunction));
}
module.exports = cd