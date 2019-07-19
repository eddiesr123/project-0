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
const jwt = require("jsonwebtoken");
const adminLoginRouter = express_1.default.Router();
// for the login / post
// promise to return a user
adminLoginRouter.post('', (request, response) => __awaiter(this, void 0, void 0, function* () {
    let username = request.body.username;
    let password = request.body.password;
    //optional console.log(username,password)
    let user = yield userService.validateUser(username, password);
    try {
        if (user.role == 1) {
            if (user.username && user.password) {
                const token = jwt.sign({ userId: user.userId, role: user.role }, "myadminsecret", //this is the secret key
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
        }
        else {
            response.status(400).json({ message: 'Invalid Credentials' });
        }
    }
    catch (_a) {
        response.status(400).json({ message: 'Invalid Credentials' });
    }
}));
exports.default = adminLoginRouter;
//# sourceMappingURL=admin-login-router.js.map