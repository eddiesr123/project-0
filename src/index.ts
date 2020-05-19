import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { closePool } from './util/pg-connector';
import userRouter from './routers/user-router';
import loginRouter from './routers/login-router';
import checkToken from './util/checkToken';
import adminRouter from './routers/admin-router';
import adminLoginRouter from './routers/admin-login-router'
import adminToken from './util/checktokenadmin';
import 'dotenv/config';

import testAPIRouter from './routers/testapi'; // TEST


// Setup Express
const app = express();

// process
const port = process.env.PORT;

// Close the pool when app shuts down
process.on('SIGINT', async () => {
    await closePool();
});

// Register middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
}));


// Register routers
app.use('/user/login', loginRouter);
app.use('/user', checkToken, userRouter);

app.use('/admin/login', adminLoginRouter);
app.use('/admin', adminToken, adminRouter); //Testing without token

app.use('/testAPI', testAPIRouter); //TEST


// Open port
app.listen(port, () => {
    console.log(`Application running on port ${port}.`);
});
