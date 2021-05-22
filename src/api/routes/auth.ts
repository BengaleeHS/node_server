import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../../services/auth';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
	app.use('/auth', route);

	/**
	 *  /api/auth/signup
	 */
	route.post(
		'/signup',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const authServiceInstance = new AuthService();

				const { user } = await authServiceInstance.SignUp(req.body);

				return res.status(201).json({ user });
			} catch (e) {
				next(e);
			}
		},
	);

	route.post(
		'/signin',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const { user_name } = req.body;
				const authServiceInstance = new AuthService();

				const { user } = await authServiceInstance.SignIn(user_name);
				return res.status(200).json({ user });
			} catch (e) {
				next(e);
			}
		},
	);

	route.post(
		'/signout',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const { user_name } = req.body;
				const authServiceInstance = new AuthService();

				const { user } = await authServiceInstance.SignOut(user_name);
				return res.status(200).json({ user });
			} catch (e) {
				next(e);
			}
		},
	);

	route.get(
		'/user',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const { user_name } = req.body;
				const authServiceInstance = new AuthService();

				const { user } = await authServiceInstance.GetUser(user_name);
				return res.status(200).json({ user });
			} catch (e) {
				next(e);
			}
		},
	);
};
