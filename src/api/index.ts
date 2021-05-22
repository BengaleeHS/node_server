import { Router } from 'express';

import auth from './routes/auth';
import record from './routes/record';

export default () => {
	const app = Router();
	auth(app);
	record(app)
	return app;
};
