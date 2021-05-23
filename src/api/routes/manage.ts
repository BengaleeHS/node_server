import { Router, Request, Response, NextFunction } from 'express';

const route = Router();

export default (app: Router) => {
	app.use('/manage', route);

	route.post(
		'/asd',
		async (req: Request, res: Response, next: NextFunction) => {},
	);
};
