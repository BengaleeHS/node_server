import { Router, Request, Response, NextFunction } from 'express';
import Record from '../../models/Record';
import Game from '../../models/Game';
import User from '../../models/User';
import FindOpponent from '../../models/FindOpponent';
import middlewares from '../middlewares';
import {IMatchInfo} from '../../interfaces/IMatch';

const route = Router();



export default(app:Router) =>{
    app.use('/match', route);

    route.post('/submit', async (req:Request, res:Response, next:NextFunction) =>{
            try{
                //ip
                //게임명
                //uid
                let matchInfo : IMatchInfo = req.body;

                const alreadyExists = await FindOpponent.findOne({user_id:matchInfo.user_id, game_id: matchInfo.game_id});

                if(!req.socket.remoteAddress){
                    throw new Error("Cannot Get Client Address");
                }
                matchInfo.location =  req.socket.remoteAddress;

                if(alreadyExists){
                    throw new Error("Already exists. Please use /poll");
                } else{
                    
                    
                    const matchOpponents = await FindOpponent.createQueryBuilder('opponent').innerJoin('record.user_id','user_id').where('game_id = :gid',{gid:matchInfo.game_id});
                    console.log(matchOpponents);
                    const gameInfo = await Game.findOne({game_id:matchInfo.game_id});
                    let matchRecord = FindOpponent.create({ game_id:matchInfo.game_id, user_id:matchInfo.user_id, location: matchInfo.location});
                    await matchRecord.save();


                    res.status(201).json({"success":true, "timeout":gameInfo.matching_duration, "location": matchInfo.location});
                }
                
            } catch (e){
                next(e);
            }

        }
    );
}