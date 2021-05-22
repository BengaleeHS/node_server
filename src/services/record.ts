import {IDataMatchLog, IDataRating} from '../interfaces/IData'

export default class RecordService{

    public async Record(dataMatchLog : IDataMatchLog){
        //put log in the Log table

        //Load previous rating from Record table

        //put updated rating in the Record table

    }

    public rating(ratingA :number, ratingB:number, scoreA : number, scoreB :number, ratingType:string, parameter:number) : [number,number]{
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