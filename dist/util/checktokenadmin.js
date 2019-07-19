"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let jwt = require('jsonwebtoken');
let adminToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
        jwt.verify(token, "myadminsecret", (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                req.token = decoded;
                next();
            }
        });
    }
    else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
exports.default = adminToken;
//# sourceMappingURL=checktokenadmin.js.map