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
function validateUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield pg_connector_1.default.query(`select * FROM "User" WHERE username = $1 and password = $2;`, [username, password]);
        return info.rows[0];
    });
}
exports.validateUser = validateUser;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pg_connector_1.default.query(`SELECT * FROM "User" WHERE userid = $1`, [id]);
        return result.rows;
    });
}
exports.getUserById = getUserById;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pg_connector_1.default.query(`SELECT * FROM "User"`);
        return result.rows;
    });
}
exports.getUsers = getUsers;
function patchUsers(patch) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pg_connector_1.default.query(`UPDATE "User" SET username = COALESCE($1, username), \ 
        password = COALESCE($2, password), \ firstName = COALESCE($3, firstname), \ lastName = COALESCE($4, lastname), \
        email = COALESCE($5, email),\ role = COALESCE($6, role) WHERE userId = $7 \
        RETURNING username, password, firstname, lastname, email, role, userId;`, [patch.username, patch.password, patch.firstName, patch.lastName, patch.email, patch.role, patch.userId]);
        if (result.rowCount === 0) {
        }
        else {
            return result.rows[0];
        }
    });
}
exports.patchUsers = patchUsers;
//# sourceMappingURL=user-service.js.map