import express, { Request, Response } from 'express';
import * as reimbursementService from '../services/reimbursement-service';
import Reimbursement from '../models/Reimbursement';

const reimbursementRouter = express.Router();


reimbursementRouter.get('/:statusId',
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

reimbursementRouter.get('/:userId',
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


reimbursementRouter.patch('',
    async (request: Request, response: Response) => {
      
        const update = request.body;

        const updatedReimbursement: Reimbursement = await reimbursementService.updateReimbursements(update);

        if (updatedReimbursement) {
            response.json(updatedReimbursement);
            response.sendStatus(200);
        } 
        
        else {response.status(400).json({message: 'Please enter a valid ID for Reimbursement!'});}
    });


    reimbursementRouter.post('',
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


export default reimbursementRouter;