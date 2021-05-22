import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
	throw new Error("Couldn't find .env file");
}
export default {
	/**
	 * server port
	 */
	port: parseInt(process.env.PORT, 10),

	/**
	 * API configs
	 */
	api: {
		prefix: '/api',
	},

	/**
	 * Database configs - postgreSQL
	 */
	db: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	},

	/**
	 * Secret sauce
	 */
	jwtSecret: process.env.JWT_SECRET,
	jwtAlgorithm: process.env.JWT_ALGO,
};
