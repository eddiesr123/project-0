export default class User {

    public userid: number;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: number;

    constructor(obj) {
        if (!obj) {
            return;
        }
        this.userid = obj.userid;
        this.username = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstname;
        this.lastName = obj.lastname;
        this.email = obj.email;
        this.role = obj.role;
    }
}
