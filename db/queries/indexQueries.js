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

export async function findUserById(id) {
    const { rows } = await dbPool.query(
        `
        SELECT * FROM users
        WHERE user_id = $1
        `,
        [id],
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

export async function provideMemberStatus(userId) {
    await dbPool.query(
        `
        UPDATE users 
        SET member = true
        WHERE user_id = $1
        `,
        [userId],
    );
}

export async function provideAdminStatus(userId) {
    await dbPool.query(
        `
        UPDATE users 
        SET member = true, admin = true
        WHERE user_id = $1
        `,
        [userId],
    );
}
