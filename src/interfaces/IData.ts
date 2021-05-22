export interface IDataMatchLog{
    game_id : number;
    user_a : number;
    user_b : number;
    score_a : number;
    score_b : number;
    created_at : string;
}

export interface IDataRating{
    game_id: number;
    user_id: number;
    ratings : string;
}