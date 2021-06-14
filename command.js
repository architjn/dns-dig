var child = require('child_process');

module.exports = (args = [], options = {}) => {
	if (options.short === true && !args.includes('+short')) args.push('+short');
	const digCMD = options.dig || 'dig';
	return new Promise((resolve, reject) => {
		const process = child.spawn(digCMD, args);
		let shellOutput = '';

		process.stdout.on('data', (chunk) => {
			shellOutput += chunk;
		});

		process.stdout.on('error', (error) => {
			reject(error);
		});

		process.stdout.on('end', () => {
			try {
				resolve(shellOutput.replace(/\n$/, ''));
			} catch (err) {
				reject(err);
			}
		});
	});
}