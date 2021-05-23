import { Router } from 'express';

import auth from './routes/auth';
import record from './routes/record';
import match from './routes/match';
import manage from './routes/manage';

export default () => {
	const app = Router();
	auth(app);
	record(app);
	match(app);
	return app;
};
