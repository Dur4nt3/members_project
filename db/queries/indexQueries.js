import dbPool from '../dbPool.js';

export async function getAllPosts() {
    const { rows } = await dbPool.query(`SELECT * FROM posts`);

    return rows;
}

export async function findUserByName(username) {
    const { rows } = await dbPool.query(
        `
        SELECT * FROM users
        WHERE username = $1
        `,
        [username],
    );

    return rows;
}

export async function createUser(username, hashedPassword, fname, lname) {
    await dbPool.query(
        `
        INSERT INTO users (username, password, first_name, last_name, member, admin)
        VALUES ($1, $2, $3, $4, false, false)
        `,
        [username, hashedPassword, fname, lname],
    );
}
