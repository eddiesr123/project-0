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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService = __importStar(require("../services/user-service"));
const reimbursementService = __importStar(require("../services/reimbursement-service"));
const Reimbursement_1 = __importDefault(require("../models/Reimbursement"));
let jwt = require('jsonwebtoken');
const userRouter = express_1.default.Router();
userRouter.get('/profile/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    let userIdToken = request.token.userid;
    let userRole = request.token.role;
    try {
        if (userIdToken === id || userRole === 1) {
            const user = yield userService.getUserById(id);
            response.status(200).json(user);
        }
        else {
            response.status(400).json({ message: 'You are Unauthorized to access this resource!' });
        }
    }
    catch (_a) {
        response.status(400).json({ message: 'You are Unauthorized to access this resource!' });
    }
}));
userRouter.post('/reimbursements/postexpense', (request, response) => {
    const reimbursement = new Reimbursement_1.default(request.body);
    reimbursementService.createReimbursement(reimbursement)
        .then((rows) => {
        if (rows.length > 0) {
            response.status(201).json(rows[0]);
        }
        else {
            response.sendStatus(400);
        }
    });
});
userRouter.get('/reimbursements/userid/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    let userIdToken = request.token.userid;
    let userRole = request.token.role;
    try {
        if (userIdToken === id || userRole === 1) {
            const reimbursement = yield reimbursementService.getReimbursementByUser(id);
            response.status(200).json(reimbursement);
        }
        else {
            response.status(400).json({ message: 'You are Unauthorized to access this resource!' });
        }
    }
    catch (_b) {
        response.status(400).json({ message: 'You are Unauthorized to access this resource!' });
    }
}));
exports.default = userRouter;
//# sourceMappingURL=user-router.js.map