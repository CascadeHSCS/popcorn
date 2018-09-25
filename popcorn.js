"use strict";
const path = require('path');
const fs = require('fs');
const console_wordtree = require('./console_wordtree');
const countdown = require('./countdown');
const createInterface = require('readline').createInterface
const terminal = createInterface({
	input: process.stdin,
	output: process.stdout
});
let slowCountdown = countdown.bind(null, 10, (step) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			process.stdout.write(`\r${step}     `)
			resolve()
		}, 1000)
	});
});

let choose = (last,choices) => {
	if(choices.length > 0){
		let choice = choices[Math.floor(Math.random() * choices.length)]
		choices = choices.filter(c => c !== choice)
		return console_wordtree(last, choice, 200).then(() => 
			new Promise((resolve,reject) => {
				setTimeout(() => {
					terminal.question("next student?",(line) => {
						resolve(choices)
					})
				}, 1500)
			}))
			.then(slowCountdown)
			.then(choose.bind(null, choice, choices))
	}
	return Promise.resolve([]);
};
const studentFile = path.join(__dirname , process.argv[2]);
fs.readFile(studentFile, (e, s) => {
	if(e) {
		console.error(e);
	} else {
		const students = s.toString('utf8').split("\n");
		terminal.question("next student?",(line) => {
			slowCountdown()
			.then(choose.bind(null, "", students))
			.then(() => console.log("done"));
		});
	}
})