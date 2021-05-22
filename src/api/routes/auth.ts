import { Router, Request, Response, NextFunction } from 'express';
import { IUserInputDTO } from '../../interfaces/IUser';
import AuthService from '../../services/auth';
import RecordService from '../../services/record';
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
				//const { user_name } = req.body;
				const authServiceInstance = new AuthService();

				const { user } = await authServiceInstance.SignIn(req.body);
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
				//const { user_name } = req.body;
				const authServiceInstance = new AuthService();

				const { user } = await authServiceInstance.SignOut(req.body);
				console.log(user);
				return res.status(200).json({ user });
			} catch (e) {
				next(e);
			}
		},
	);

	route.post(
		'/user',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const authServiceInstance = new AuthService();
				const { user } = await authServiceInstance.GetUser(req.body);
				console.log(user);
				const udat : IUserInputDTO = req.body;
				console.log(udat);
				const recordServiceInstance = new RecordService();
				const {rating} = await recordServiceInstance.GetUserRating(udat.game_id,user.user_id);
				return res.status(200).json({ ...user, ...rating  });
			} catch (e) {
				next(e);
			}
		},
	);
};
