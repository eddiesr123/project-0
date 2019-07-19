import Reimbursement from '../models/Reimbursement';
import db from '../util/pg-connector';


export async function getReimbursementByStatus(id: number): Promise<Reimbursement[]> {
    const result = await db.query(`SELECT * FROM "reimbursement" WHERE status = $1`, [id]);
    return result.rows;
}

export async function getReimbursementByUser(id: number): Promise<Reimbursement[]> {
    const result = await db.query(`SELECT * FROM "reimbursement" WHERE author = $1`, [id]);
    return result.rows;
}

export async function getReimbursements(): Promise<Reimbursement[]> {
    const result = await db.query(`SELECT * FROM "reimbursement"`);
    return result.rows;
}


export async function updateReimbursements(update: Reimbursement) {

    const result = await db.query(`UPDATE "reimbursement" SET author = COALESCE($1, author), \ 
        amount = COALESCE($2, amount), \ dateSubmitted = COALESCE($3, dateSubmitted), \
        dateResolved = COALESCE($4, dateResolved),\ description = COALESCE($5, description), \ 
        resolver = COALESCE($6, resolver),\ status = COALESCE($7, status), type = COALESCE($8, type) \
        WHERE reimbursementId = $9 RETURNING reimbursementId, author, amount, dateSubmitted, dateResolved, \
        description, resolver, status, type;`,
        [update.author, update.amount, update.dateSubmitted, update.dateResolved, update.description,
        update.resolver, update.status, update.type, update.reimbursementId]);

    if (result.rowCount === 0) {
    } else {
        return result.rows[0];
    }

}

export function createReimbursement(reimbursement: Reimbursement):
    Promise<Reimbursement[]> {

        return db.query(`INSERT INTO "reimbursement" (author, amount, dateSubmitted, dateResolved,
            description, resolver, status, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type`, 
            [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved, 
            reimbursement.description, reimbursement.resolver,
            reimbursement.status, reimbursement.type])
            .then((data) => {
                return data.rows;
            }).catch((err) => {
                return [err];
            });          
        
    }