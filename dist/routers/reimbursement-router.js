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
const reimbursementService = __importStar(require("../services/reimbursement-service"));
const Reimbursement_1 = __importDefault(require("../models/Reimbursement"));
const reimbursementRouter = express_1.default.Router();
reimbursementRouter.get('/:statusId', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const statusId = parseInt(request.params.statusId);
    const reimbursement = yield reimbursementService.getReimbursementByStatus(statusId);
    if (reimbursement) {
        response.status(200).json(reimbursement);
    }
    else {
        response.sendStatus(400);
    }
}));
reimbursementRouter.get('/:userId', (request, response) => __awaiter(this, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const reimbursement = yield reimbursementService.getReimbursementByUser(id);
    if (reimbursement) {
        response.status(200).json(reimbursement);
    }
    else {
        response.sendStatus(400);
    }
}));
reimbursementRouter.patch('', (request, response) => __awaiter(this, void 0, void 0, function* () {
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
reimbursementRouter.post('', (request, response) => {
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
exports.default = reimbursementRouter;
//# sourceMappingURL=reimbursement-router.js.map