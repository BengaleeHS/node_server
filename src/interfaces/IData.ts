
export interface IDataMatchLog{
    game_id : number;
    user_a_id : number;
    user_b_id : number;
    a_score : number;
    b_score : number;
    created_at? : string;
}

export interface IDataRating{
    game_id: number;
    user_id: number;
    rating_1 : number;
    rating_2: number;
}

