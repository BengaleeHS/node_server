import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import RecordService from '../../services/record';
const route = Router();

export default(app:Router) =>{
    app.use('/record', route);
    route.post('/',
        async (req: Request, res : Response, next: NextFunction) => {
            try{
                
            } catch(e){

            }
        }
    )
}