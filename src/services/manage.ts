import User from '../models/User';
import { Log } from '../models/Log';
import { IUser } from '../interfaces/IUser';

export default class ManangeService {
	// 해당되는 유저의 Record
	async getRecord(username): Promise<{ user_records: IUser[] }> {
		const user = await User.find({
			relations: ['record'],
			where: { user_name: username },
		});

		if (!user) {
			throw new Error('There is not exsited!');
		}

		return { user_records: user };
	}

	// Find and return user's game log.
	async getLog(username) {}
}
