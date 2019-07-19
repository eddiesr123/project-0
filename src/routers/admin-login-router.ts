import express, {Request, Response} from 'express';
import User from '../models/User';
import * as userService from '../services/user-service';


import jwt = require('jsonwebtoken');

const adminLoginRouter = express.Router();


// for the login / post
// promise to return a user
adminLoginRouter.post('', async (request: Request, response: Response) => {
    let username = request.body.username;
    let password = request.body.password;
    //optional console.log(username,password)
    let user : User = await userService.validateUser(username, password);

    try{
    if (user.role == 1) {
        if(user.username && user.password) {
            const token =jwt.sign({userid: user.userid, role: user.role},

            "myadminsecret", //this is the secret key
            //sets expiration for the token
            { expiresIn: "24hr"
            });

            //provides the token if the login credentials are true.
            response.status(200).json({
                admin: username,
                success: true,
                token: token
            });
        }
    } else {response.status(400).json({message: 'Invalid Credentials'});}
        } catch {response.status(400).json({message: 'Invalid Credentials'});}
});




export default adminLoginRouter;