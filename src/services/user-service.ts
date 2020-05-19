import User from '../models/User';
import db from '../util/pg-connector';


export async function validateUser(username: String, password: String) {
    const info = await db.query(`select * FROM "User" WHERE username = $1 and password = $2;`,
    [username, password]);
    return info.rows[0];
}


export async function getUserById(id: number): Promise<User[]> {
    const result = await db.query(`SELECT * FROM "User" WHERE userid = $1`, [id]);
    return result.rows;
}

export async function getUsers(): Promise<User[]> {
    const result = await db.query(`SELECT * FROM "User" ORDER BY "userid" ASC`);
    return result.rows;
}


export async function patchUsers(patch: User) {

    const result = await db.query(`UPDATE "User" SET username = COALESCE($1, username), \ 
        password = COALESCE($2, password), \ firstName = COALESCE($3, firstname), \ lastName = COALESCE($4, lastname), \
        email = COALESCE($5, email),\ role = COALESCE($6, role) WHERE userid = $7 \
        RETURNING username, password, firstname, lastname, email, role, userid;`,
        [patch.username, patch.password, patch.firstName, patch.lastName, patch.email, patch.role, patch.userid]);

    if (result.rowCount === 0) {

    } else {
        return result.rows[0];
    }

}