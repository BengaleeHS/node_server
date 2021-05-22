import { createConnection, Connection } from 'typeorm';
import chalk from 'chalk';
import AuthService from '../services/auth';
import config from '../config';

import User from '../models/User';
import Record from '../models/Record';
import Log from '../models/Log';
import Game from '../models/Game';
import FindOpponent from '../models/FindOpponent';

export default async (): Promise<Connection> => {
	const dbConnection = await createConnection({
		type: 'postgres',
		host: config.db.host,
		port: config.db.port,
		username: config.db.username,
		password: config.db.password,
		database: config.db.database,
		synchronize: true,
		logging: false,
		entities: [User, Record, Log, Game, FindOpponent],
		// dropSchema는 커넥션이 실행 될 때마다 데이터베이스를 삭제하고 생성합니다.
		// 개발버전에서만 사용해야합니다.
		dropSchema: true,
	});

	/**
	 * 아래 부분은 데이터베이스의 초기 rows들을 정의하는 부분입니다.
	 * @TODO 서버의 개발 방향에 따라 알맞게 수정하시면 됩니다.
	 */
	process.stdout.write('🍓 Creating initial rows of creamo_user table');
	process.stdout.cursorTo(48);
	return dbConnection;
};
