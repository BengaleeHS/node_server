import { randomBytes } from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/User';
import Game from '../models/Game';
import Record from '../models/Record';
import { IUser, IUserInputDTO } from '../interfaces/IUser';

/**
 * 유저의 가입, 로그인 기능을 담당하는 클래스
 *
 * @author 김기환
 * @version 1.0.0 SignUp, SignIn 구현
 */
export default class AuthService {
	/**
	 *	새로운 유저를 추가한다.
	 * @param userInputDTO 유저가 입력한 유저 정보
	 * @returns { user } 생성된 유저 정보, 토큰
	 */
	private async isGameExists(game_id:number){
		const gameExists= await Game.findOne({
			game_id: game_id,
		});
		if (!gameExists) {
			const err = new Error('The game do not exists');
				err['status'] = 400;
				throw err;
		}
		return gameExists;
	}

	public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
		try {
			/* 모든 정보가 입력되었는지 확인한다 */
			if (typeof userInputDTO.user_name === 'undefined' || typeof userInputDTO.game_id === 'undefined') {
				const err = new Error('There is information not entered');
				err['status'] = 400;
				throw err;
			}
			let game_id = await this.isGameExists(userInputDTO.game_id)
			

			let userRecord = User.create({ ...userInputDTO });
			
			const getSameUsername = await User.find({
				user_name: userInputDTO.user_name,
				game_id: userInputDTO.game_id,
			});

			/* 데이터베이스에 같은 username, gameid가 존재하는지 확인한다 */
			if (getSameUsername.length) {
				throw new Error('This user name for this game is already being used');
			}
			
			userRecord = await userRecord.save();

			let gameRecord = Record.create({game_id:userInputDTO.game_id,user_id:userRecord.user_id,rating_1:config.rating.r1_init, rating_2:config.rating.r2_init } );
			await gameRecord.save()
			const user = JSON.parse(JSON.stringify(userRecord));

			return { user };
		} catch (e) {
			throw e;
		}
	}

	/**
	 * 유저 이름을 입력하고 로그인을 진행한다.
	 * @param userName 유저 이름
	 */
	public async SignIn(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
		const userRecord = await User.findOne({ user_name: userInputDTO.user_name, game_id:userInputDTO.game_id });
		if (!userRecord) {
			throw new Error('User not registered');
		}

		userRecord.is_login = true;

		await userRecord.save();

		const user = JSON.parse(JSON.stringify(userRecord));
		return { user };
	}

	/**
	 * 유저 이름을 입력하고 로그아웃을 진행한다.
	 * @param userName 유저 이름
	 */
	public async SignOut(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
		const userRecord = await User.findOne({ user_name: userInputDTO.user_name, game_id:userInputDTO.game_id });
		if (!userRecord) {
			throw new Error('User not registered');
		}

		userRecord.is_login = false;

		await userRecord.save();

		const user = JSON.parse(JSON.stringify(userRecord));

		return { user };
	}

	/**
	 * 유저 이름을 입력하고 현재 유저의 상태를 반환한다.
	 * @param userName 유저 이름
	 */
	public async GetUser(userInputDTO:IUserInputDTO): Promise<{ user: IUser}> {
		const userRecord = await User.findOne({ ...userInputDTO });
		if (!userRecord) {
			throw new Error('User not registered');
		}
		const user = JSON.parse(JSON.stringify(userRecord));
		
		return {user} ;
	}
}
