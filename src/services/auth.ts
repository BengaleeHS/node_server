import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/User';
import { IUser, IUserInputDTO } from '../interfaces/IUser';

/**
 * 유저의 가입, 로그인 기능을 담당하는 클래스
 *
 * @author 김기환
 * @version 1.0.0 SignUp, SignIn 구현
 */
export default class AuthService {
	/**
	 *	크리모의 새로운 유저를 추가한다.
	 * @param userInputDTO 유저가 입력한 유저 정보
	 * @returns { user, token } 생성된 유저 정보, 토큰
	 */
	public async SignUp(
		userInputDTO: IUserInputDTO,
	): Promise<{ user: IUser; token: string }> {
		try {
			/* 모든 정보가 입력되었는지 확인한다 */
			if (
				typeof userInputDTO.email === 'undefined' ||
				typeof userInputDTO.name === 'undefined' ||
				typeof userInputDTO.password === 'undefined'
			) {
				const err = new Error('There is information not entered');
				err['status'] = 400;
				throw err;
			}

			const salt = randomBytes(32);

			const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
			let userRecord = User.create({
				...userInputDTO,
				role: 2,
				salt: salt.toString('hex'),
				password: hashedPassword,
			});

			const getSameEmail = await User.find({
				email: userInputDTO.email,
			});

			/* 데이터베이스에 email이 존재하는지 확인한다 */
			if (getSameEmail.length) {
				throw new Error('This email is already being used');
			}

			await userRecord.save();
			const token = this.generateToken(userRecord);

			/**
			 * @TODO 완벽한 3계층 레이어가 아니다.
			 * controller - service - data access
			 * 추후 service와 data access를 나눌 필요성이 있다.
			 * 유지관리를 위한 것이니 굳이 할 필요는 없습니다.
			 */
			const user = JSON.parse(JSON.stringify(userRecord));
			Reflect.deleteProperty(user, 'password');
			Reflect.deleteProperty(user, 'salt');
			Reflect.deleteProperty(user, 'id');
			return { user, token };
		} catch (e) {
			throw e;
		}
	}

	/**
	 * 계정을 입력하고 로그인을 진행한다.
	 * @param email 유저의 이메일
	 * @param password 유저의 패스워드
	 */
	public async SignIn(
		email: string,
		password: string,
	): Promise<{ user: IUser; token: string }> {
		const userRecord = await User.findOne({ email });
		if (!userRecord) {
			throw new Error('User not registered');
		}
		/**
		 * We use verify from argon2 to prevent 'timing based' attacks
		 */
		const validPassword = await argon2.verify(userRecord.password, password);
		if (validPassword) {
			const token = this.generateToken(userRecord);

			const user = JSON.parse(JSON.stringify(userRecord));
			Reflect.deleteProperty(user, 'password');
			Reflect.deleteProperty(user, 'salt');
			Reflect.deleteProperty(user, 'id');
			/**
			 * Easy as pie, you don't need passport.js anymore :)
			 */
			return { user, token };
		} else {
			throw new Error('Invalid Password');
		}
	}

	/**
	 * 현재 서버 시간으로부터 4시간 동안 유효한 JWT토큰을 생성한다.
	 * @param user 토큰을 생성 하고자하는 유저 정보
	 */
	private generateToken(user: IUser) {
		const today = new Date();
		const exp = new Date(today);
		exp.setHours(today.getHours() + 4);

		return jwt.sign(
			{
				id: user.id, // We are gonna use this in the middleware 'isAuth'
				email: user.email,
				exp: exp.getTime() / 1000,
			},
			config.jwtSecret,
		);
	}
}
