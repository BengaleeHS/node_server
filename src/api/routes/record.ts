import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import RecordService from '../../services/record';

const route = Router();

export default(app:Router) =>{
    app.use('/record', route);
    route.post('/',
        async (req: Request, res : Response, next: NextFunction) => {
            try{
                const recordServiceInstance = new RecordService();
                const newRatings = recordServiceInstance.Record(req.body);
                return res.status(201).json({success:true, ...newRatings});
            } catch(e){
                next(e);
            }
        }
    )
}