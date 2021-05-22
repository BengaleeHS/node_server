import {IDataMatchLog, IDataRating} from '../interfaces/IData'
import User from '../models/User';
import Record from '../models/Record';
import Log from '../models/Log';
import record from '../api/routes/record';
export default class RecordService{

    public async Record(dataMatchLog : IDataMatchLog){
        //put log in the Log table
        try{
            let createLog = Log.create(dataMatchLog);
            
            //Load previous rating from Record table
            let prevRecordA = await Record.findOne({game_id: dataMatchLog.game_id, user_id: dataMatchLog.user_a_id});
            let prevRecordB = await Record.findOne({game_id: dataMatchLog.game_id, user_id: dataMatchLog.user_b_id});
            
            //calculate new rating
            const [rating_1_a, rating_1_b]= this.rating(prevRecordA.rating_1,prevRecordB.rating_1,dataMatchLog.a_score,dataMatchLog.b_score,'elo',25);
            const [rating_2_a, rating_2_b]= this.rating(prevRecordA.rating_1,prevRecordB.rating_1,dataMatchLog.a_score,dataMatchLog.b_score,'decay',0.6);

            //put updated rating in the Record table
            await Record.update({game_id:dataMatchLog.game_id, user_id:dataMatchLog.user_a_id},{rating_1:rating_1_a, rating_2:rating_2_a});
            await Record.update({game_id:dataMatchLog.game_id, user_id:dataMatchLog.user_a_id},{rating_1:rating_1_b, rating_2:rating_2_b});

            await createLog.save();
            return {Ra1:rating_1_a, Ra2:rating_2_a, Rb1:rating_1_b, Rb2:rating_2_b};
        } catch(e){
            throw(e);
        }

        
    }

    private rating(ratingA :number, ratingB:number, scoreA : number, scoreB :number, ratingType:string, parameter:number) : [number,number]{
        switch (ratingType){
            case "elo":
                return this.elo(ratingA,ratingB,scoreA,scoreB,parameter);
            case "decay":
                return [this.decay(ratingA,scoreA,parameter),this.decay(ratingB,scoreB,parameter)];
            default:
                return [-1,-1];
        }
    }

    private elo(rA : number,rB: number,sA: number,sB: number,k: number) : [number,number]{
        let eA = 1./(1.+Math.pow(10,(rB-rA)/400.));
        let eB = 1./(1.+Math.pow(10,(rA-rB)/400.));

        return [(rA+k*(eA-sA)), (rB+k*(eB-sB))];
    }

    private decay(r:number, s:number, d:number):number{
        return 1000*s+r*d;
    }
}