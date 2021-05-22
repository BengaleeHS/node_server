import jwt from 'express-jwt';
import config from '../../config';

const getTokenFromHeader = req => {
	if (
		(req.headers.authorization &&
			req.headers.authorization.split(' ')[0] === 'Token') ||
		(req.headers.authorization &&
			req.headers.authorization.split(' ')[0] === 'Bearer')
	) {
		return req.headers.authorization.split(' ')[1];
	}
	return null;
};

const isAuth = jwt({
	secret: config.jwtSecret,
	algorithms: [config.jwtAlgorithm],
	userProperty: 'token', // req.token에 JWT를 전송
	getToken: getTokenFromHeader,
});

export default isAuth;
