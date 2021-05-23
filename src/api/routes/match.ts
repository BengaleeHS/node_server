import { Router, Request, Response, NextFunction } from 'express';
import Record from '../../models/Record';
import Game from '../../models/Game';
import User from '../../models/User';
import FindOpponent from '../../models/FindOpponent';
import middlewares from '../middlewares';
import {IMatchInfo} from '../../interfaces/IMatch';
import config from '../../config';

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
                    const gameInfo = await Game.findOne({game_id:matchInfo.game_id});
                    const ratingInfo = await Record.findOne({game_id:matchInfo.game_id, user_id:matchInfo.user_id});
                    let rat = ratingInfo.rating_1;
                    if (gameInfo.rating_type === 2) rat = ratingInfo.rating_2;

                    let matchUserId = -1;
                    //find wating users
                    const waitingUsers = await FindOpponent.find({game_id:matchInfo.game_id, matched_with:-1});
                    for (let i=0; i<waitingUsers.length;++i){
                        if(Math.abs(waitingUsers[i].rating - rat)< gameInfo.matching_range){
                            matchUserId = waitingUsers[i].user_id;
                            await FindOpponent.update({game_id:matchInfo.game_id, user_id:matchUserId},{matched_with:matchInfo.user_id});
                            break;
                        }                        
                    }
                    console.log(await FindOpponent.find({game_id:matchInfo.game_id}));
                    
                    let matchRecord = FindOpponent.create({ game_id:matchInfo.game_id, user_id:matchInfo.user_id, location: matchInfo.location, rating:rat, matched_with:matchUserId});
                    await matchRecord.save();


                    res.status(201).json({"success":true, "timeout":gameInfo.matching_duration, "location": matchInfo.location});
                }
                
            } catch (e){
                next(e);
            }

        }
    );
    route.post('/poll', async (req:Request, res:Response, next:NextFunction) =>{
        try{

            let matchInfo : IMatchInfo = req.body;

            const alreadyExists = await FindOpponent.findOne({user_id:matchInfo.user_id, game_id: matchInfo.game_id});

            if(alreadyExists){
                if(alreadyExists.matched_with !==-1){
                    const opponent = await FindOpponent.findOne({user_id:alreadyExists.matched_with, game_id: matchInfo.game_id});
                    res.status(200).json({"success":true, "matched":true, "location":opponent.location});
                }
                res.status(200).json({"success":true, "matched":false});
            } else{
                throw new Error("There is no match submit!");
            }
            
        } catch (e){
            next(e);
        }

    });
    route.post('/complete', async (req:Request, res:Response, next:NextFunction) =>{
        try{

            let matchInfo : IMatchInfo = req.body;

            const alreadyExists = await FindOpponent.findOne({user_id:matchInfo.user_id, game_id: matchInfo.game_id});

            if(alreadyExists){
                if(alreadyExists.matched_with !==-1){
                    await FindOpponent.delete({user_id:alreadyExists.matched_with, game_id: matchInfo.game_id});
                    await FindOpponent.delete({user_id:matchInfo.user_id, game_id: matchInfo.game_id});
                    res.status(200).json({"success":true});
                }
                res.status(200).json({"success":false});
            } else{
                throw new Error("There is no match to delete");
            }
            
        } catch (e){
            next(e);
        }

    });
    route.post('/cancel', async (req:Request, res:Response, next:NextFunction) =>{
        try{

            let matchInfo : IMatchInfo = req.body;

            const alreadyExists = await FindOpponent.findOne({user_id:matchInfo.user_id, game_id: matchInfo.game_id});

            if(alreadyExists){
                await FindOpponent.delete({user_id:matchInfo.user_id, game_id: matchInfo.game_id});
                res.status(200).json({"success":true});
            } else{
                throw new Error("There is no match to delete");
            }
            
        } catch (e){
            next(e);
        }

    });
}