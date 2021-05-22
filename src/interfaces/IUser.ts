export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
	salt: string;
}

export interface IUserInputDTO {
	name: string;
	email: string;
	password: string;
}

export interface IUserCreateInputDTO {
	role_id: number;
	name: string;
	email: string;
	password: string;
}

export interface IUserReadInputDTO {
	id?: number;
	role_id?: number;
	name?: string;
	email?: string;
}

export interface IUserUpdateInputDTO {
	id: number;
	role_id?: number;
	name?: string;
	password?: string;
	salt?: string;
}

export interface IUserDeleteInputDTO {
	id: number;
}
