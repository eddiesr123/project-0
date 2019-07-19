"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(obj) {
        if (!obj) {
            return;
        }
        this.userId = obj.userId;
        this.username = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstname;
        this.lastName = obj.lastname;
        this.email = obj.email;
        this.role = obj.role;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map