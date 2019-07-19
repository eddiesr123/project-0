import express, { Request, Response } from 'express';
import * as userService from '../services/user-service';
import * as reimbursementService from '../services/reimbursement-service';
import Reimbursement from '../models/Reimbursement';
import User from 'models/User';
let jwt = require('jsonwebtoken');


const adminRouter = express.Router();


adminRouter.get('/getusers',
    async (request: any, response: Response) => {

        const user = await userService.getUsers();

        if (user) {
            response.status(200).json(user); 
        } else {
            response.sendStatus(400);
        }
    }
);

adminRouter.get('/getusers/:id',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.id);

        const user = await userService.getUserById(id);

        if (user) {
            response.status(200).json(user);
        } else {
            response.sendStatus(400);
        }
    }
);


adminRouter.patch('/updateuser',
    async (request: Request, response: Response) => {
      
        const patch = request.body;

        const patchedUser: User = await userService.patchUsers(patch);

        if (patchedUser) {
            response.json(patchedUser);
            response.sendStatus(200);
        }
        
        else {response.status(400).json({message: 'Please enter a valid ID for Employee!'});}
    });


adminRouter.get('/reimbursements/statusid/:statusId',
    async (request: Request, response: Response) => {
        const statusId = parseInt(request.params.statusId);

        const reimbursement = await reimbursementService.getReimbursementByStatus(statusId);

        if (reimbursement) {
            response.status(200).json(reimbursement);
        } else {
            response.sendStatus(400);
        }
    }
);


adminRouter.get('/reimbursements/auth/:id',
    async (request: Request, response: Response) => {
        const id = parseInt(request.params.id);

        const reimbursement = await reimbursementService.getReimbursementByUser(id);

        if (reimbursement) {
            response.status(200).json(reimbursement);
        } else {
            response.sendStatus(400);
        }
    }
);

adminRouter.patch('/reimbursements/resolve',
    async (request: Request, response: Response) => {
      
        const update = request.body;

        const updatedReimbursement: Reimbursement = await reimbursementService.updateReimbursements(update);

        if (updatedReimbursement) {
            response.json(updatedReimbursement);
            response.status(200);
        } 
        
        else {response.status(400).json({message: 'Please enter a valid ID for Reimbursement!'});}
    });


export default adminRouter;