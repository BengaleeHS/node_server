import expressLoader from './express';
import postgreLoader from './postgreSQL';

export default async ({ expressApp }) => {
	//await postgreLoader();
	//console.log('✅ Database loaded');

	await expressLoader({ app: expressApp });
	console.log('✅ Express loaded');
};
