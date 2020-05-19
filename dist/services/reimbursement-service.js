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
const pg_connector_1 = __importDefault(require("../util/pg-connector"));
function getReimbursementByStatus(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pg_connector_1.default.query(`SELECT * FROM "reimbursement" WHERE status = $1 ORDER BY "reimbursementid" ASC`, [id]);
        return result.rows;
    });
}
exports.getReimbursementByStatus = getReimbursementByStatus;
function getReimbursementByUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pg_connector_1.default.query(`SELECT * FROM "reimbursement" WHERE author = $1 ORDER BY "reimbursementid" ASC`, [id]);
        return result.rows;
    });
}
exports.getReimbursementByUser = getReimbursementByUser;
function getReimbursements() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pg_connector_1.default.query(`SELECT * FROM "reimbursement" ORDER BY "reimbursementid" ASC`);
        return result.rows;
    });
}
exports.getReimbursements = getReimbursements;
function updateReimbursements(update) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pg_connector_1.default.query(`UPDATE "reimbursement" SET author = COALESCE($1, author), \ 
        amount = COALESCE($2, amount), \ dateSubmitted = COALESCE($3, dateSubmitted), \
        dateResolved = COALESCE($4, dateResolved),\ description = COALESCE($5, description), \ 
        resolver = COALESCE($6, resolver),\ status = COALESCE($7, status), type = COALESCE($8, type) \
        WHERE reimbursementId = $9 RETURNING reimbursementId, author, amount, dateSubmitted, dateResolved, \
        description, resolver, status, type;`, [update.author, update.amount, update.dateSubmitted, update.dateResolved, update.description,
            update.resolver, update.status, update.type, update.reimbursementId]);
        if (result.rowCount === 0) {
        }
        else {
            return result.rows[0];
        }
    });
}
exports.updateReimbursements = updateReimbursements;
function createReimbursement(reimbursement) {
    return pg_connector_1.default.query(`INSERT INTO "reimbursement" (author, amount, dateSubmitted, dateResolved,
            description, resolver, status, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type`, [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved,
        reimbursement.description, reimbursement.resolver,
        reimbursement.status, reimbursement.type])
        .then((data) => {
        return data.rows;
    }).catch((err) => {
        return [err];
    });
}
exports.createReimbursement = createReimbursement;
//# sourceMappingURL=reimbursement-service.js.map