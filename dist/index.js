"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const pg_connector_1 = require("./util/pg-connector");
const user_router_1 = __importDefault(require("./routers/user-router"));
const login_router_1 = __importDefault(require("./routers/login-router"));
const checkToken_1 = __importDefault(require("./util/checkToken"));
const admin_router_1 = __importDefault(require("./routers/admin-router"));
const admin_login_router_1 = __importDefault(require("./routers/admin-login-router"));
const checktokenadmin_1 = __importDefault(require("./util/checktokenadmin"));
require("dotenv/config");
// Setup Express
const app = express_1.default();
// process
const port = 3000;
// Close the pool when app shuts down
process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
    yield pg_connector_1.closePool();
}));
// Register middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    resave: false,
    saveUninitialized: true,
    secret: 'mysecret',
}));
// Register routers
app.use('/login', login_router_1.default);
app.use('/', checkToken_1.default, user_router_1.default);
//app.use('/reimbursements/author/', checkToken, userRouter);
//app.use('/reimbursements', checkToken, userRouter);
app.use('/admin', admin_login_router_1.default);
app.use('/', checktokenadmin_1.default, admin_router_1.default);
//app.use('/admin/reimbursements/status', adminToken, adminRouter);
//app.use('/admin/reimbursements/author/userId', adminToken, adminRouter);
//app.use('/admin/reimbursements', adminToken, adminRouter);
// Open port
app.listen(port, () => {
    console.log(`Application running on port ${port}.`);
});
//# sourceMappingURL=index.js.map