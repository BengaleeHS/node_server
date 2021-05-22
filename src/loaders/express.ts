import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from '../api';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
	// Middleware that logs access of user
	app.use(morgan('dev'));

	// Alternate description:
	// Enable Cross Origin Resource Sharing to all origins by default
	app.use(cors());

	// Middleware that transforms the raw string of req.body into json
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(config.api.prefix, routes());

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});

	// error handler
	app.use((err, req, res, next) => {
		console.error(`😡 error: %s`, err.message);

		res.json({
			errors: {
				status: err.status || 500,
				message: err.message,
			},
		});
	});
};
