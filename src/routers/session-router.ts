
import express, { Request, Response } from 'express';


const sessionRouter = express.Router();

    sessionRouter.post('/', (request: Request, response: Response) => {
        const payload = request.body;
        request.session.uid = payload.id;
        request.session.name = payload.name;
        response.sendStatus(201);
    });
    
    sessionRouter.get('/', (request: Request, response: Response) => {
        response.json({message: `Hello ${request.session.name}!`});
    });

    export default sessionRouter;