"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reimbursement {
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.reimbursementId = obj.reimbursementId;
        this.author = obj.author;
        this.amount = obj.amount;
        this.dateSubmitted = obj.datesubmitted;
        this.dateResolved = obj.dateresolved;
        this.description = obj.description;
        this.resolver = obj.resolver;
        this.status = obj.status;
        this.type = obj.type;
    }
}
exports.default = Reimbursement;
//# sourceMappingURL=Reimbursement.js.map