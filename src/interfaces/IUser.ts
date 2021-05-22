export interface IUser {
	user_id: number;
	user_name: string;
	is_login: boolean;
	game_id : number
}

export interface IUserInputDTO {
	user_name: string;
	game_id: number;
}
