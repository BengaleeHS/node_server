export interface IUser {
	user_id: number;
	user_name: string;
	game_id : number
	is_login: boolean;
}

export interface IUserInputDTO {
	user_name: string;
	game_id: number;
}
