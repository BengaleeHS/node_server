import 'reflect-metadata';
import express from 'express';

import loaders from './loaders';
import config from './config';
import chalk from 'chalk';

async function startServer() {
	const app = express();

	await loaders({ expressApp: app });

	app.listen(config.port, () => {
		const width = process.stdout.columns;

		for (let i = 0; i < width; ++i) {
			process.stdout.write(chalk.greenBright('='));
		}
		for (let i = 0; i < width; ++i) {
			process.stdout.write(chalk.blueBright('-'));
		}
		process.stdout.write('\n\n');

		const listeningMSG = `🛡️  Server listening on port:${config.port}  🛡️`;
		process.stdout.cursorTo(Math.round((width - listeningMSG.length) / 2));
		process.stdout.write(chalk.yellowBright(listeningMSG));

		process.stdout.write('\n\n');
		for (let i = 0; i < width; ++i) {
			process.stdout.write(chalk.blueBright('-'));
		}
		for (let i = 0; i < width; ++i) {
			process.stdout.write(chalk.greenBright('='));
		}
		process.stdout.write('\n');
	});
}

startServer();
