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

				const { user, token } = await authServiceInstance.SignUp(req.body);

				return res.status(201).json({ user, token });
			} catch (e) {
				next(e);
			}
		},
	);

	route.post(
		'/signin',
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const { email, password } = req.body;
				const authServiceInstance = new AuthService();

				const { user, token } = await authServiceInstance.SignIn(
					email,
					password,
				);
				return res.status(200).json({ user, token });
			} catch (e) {
				next(e);
			}
		},
	);

	/**
	 * JWT을 이용한 사용자 인증 방법은 일반적으로 로그아웃을 지원하지 않습니다.
	 * 로그아웃을 구현하는 방법이 있긴 하지만 지금 상황에서 불필요하여 작성하지 않았습니다.
	 */
	route.post(
		'/logout',
		middlewares.isAuth,
		async (req: Request, res: Response, next: NextFunction) => {
			return res.json({}).status(200);
		},
	);
};
