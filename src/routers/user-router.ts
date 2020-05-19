import express, { Request, Response } from 'express';
import * as userService from '../services/user-service';
import * as reimbursementService from '../services/reimbursement-service';
import Reimbursement from '../models/Reimbursement';
let jwt = require('jsonwebtoken');

const userRouter = express.Router();


userRouter.get('/profile/:id',
    async (request: any, response: Response) => {

        const id = parseInt(request.params.id);

        let userIdToken = request.token.userid;
        let userRole = request.token.role;

        try {
        if (userIdToken === id || userRole === 1) {
          const user = await userService.getUserById(id);

          response.status(200).json(user);

        }  else {response.status(400).json({message: 'You are Unauthorized to access this resource!'});}

        } catch {response.status(400).json({message: 'You are Unauthorized to access this resource!'});}

    }
);



userRouter.post('/reimbursements/postexpense',
(request: Request, response: Response) => {
    const reimbursement = new Reimbursement(request.body);

    reimbursementService.createReimbursement(reimbursement)

        .then((rows) => {
            if (rows.length > 0) {
                response.status(201).json(rows[0]);
            } else {
                response.sendStatus(400);
            }
        });
});

userRouter.get('/reimbursements/userid/:id',
    async (request: any, response: Response) => {
        const id = parseInt(request.params.id);

        let userIdToken = request.token.userid;
        let userRole = request.token.role;

        try {
            if (userIdToken === id || userRole === 1) {
            const reimbursement = await reimbursementService.getReimbursementByUser(id);

            response.status(200).json(reimbursement);

            } else {
                response.status(400).json({message: 'You are Unauthorized to access this resource!'});} 
        
        } catch {response.status(400).json({message: 'You are Unauthorized to access this resource!'});}

    }
);



export default userRouter;