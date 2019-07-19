"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionRouter = express_1.default.Router();
sessionRouter.post('/', (request, response) => {
    const payload = request.body;
    request.session.uid = payload.id;
    request.session.name = payload.name;
    response.sendStatus(201);
});
sessionRouter.get('/', (request, response) => {
    response.json({ message: `Hello ${request.session.name}!` });
});
exports.default = sessionRouter;
//# sourceMappingURL=session-router.js.map