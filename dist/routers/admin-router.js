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
const adminRouter = express_1.default.Router();
adminRouter.get('/getusers', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const user = yield userService.getUsers();
    if (user) {
        response.status(200).json(user);
    }
    else {
        response.sendStatus(400);
    }
}));
adminRouter.get('/user/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const user = yield userService.getUserById(id);
    if (user) {
        response.status(200).json(user);
    }
    else {
        response.sendStatus(400);
    }
}));
adminRouter.patch('/updateuser', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const patch = request.body;
    const patchedUser = yield userService.patchUsers(patch);
    if (patchedUser) {
        response.json(patchedUser);
        response.sendStatus(200);
    }
    else {
        response.status(400).json({ message: 'Please enter a valid ID for Employee!' });
    }
}));
adminRouter.get('/reimbursements/statusid/:statusId', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const statusId = parseInt(request.params.statusId);
    const reimbursement = yield reimbursementService.getReimbursementByStatus(statusId);
    if (reimbursement) {
        response.status(200).json(reimbursement);
    }
    else {
        response.sendStatus(400);
    }
}));
adminRouter.get('/reimbursements/auth/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const reimbursement = yield reimbursementService.getReimbursementByUser(id);
    if (reimbursement) {
        response.status(200).json(reimbursement);
    }
    else {
        response.sendStatus(400);
    }
}));
adminRouter.patch('/reimbursements/resolve', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const update = request.body;
    const updatedReimbursement = yield reimbursementService.updateReimbursements(update);
    if (updatedReimbursement) {
        response.json(updatedReimbursement);
        response.sendStatus(200);
    }
    else {
        response.status(400).json({ message: 'Please enter a valid ID for Reimbursement!' });
    }
}));
exports.default = adminRouter;
//# sourceMappingURL=admin-router.js.map