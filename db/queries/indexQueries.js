import dbPool from '../dbPool.js';

export async function getAllPosts() {
    const { rows } = await dbPool.query(`
        SELECT users.user_id, users.first_name, users.last_name, posts.post_id, posts.title, posts.body, posts.added
        FROM posts
        LEFT JOIN users
        ON posts.user_id = users.user_id
        `);

    return rows;
}

export async function getPostById(postId) {
    const { rows } = await dbPool.query(
        `
        SELECT * FROM posts
        WHERE post_id = $1
        `,
        [postId],
    );

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

export async function createMessage(title, body, timestamp, userId) {
    await dbPool.query(
        `
        INSERT INTO posts (title, body, added, user_id)
        VALUES ($1, $2, $3, $4)
        `,
        [title, body, timestamp, userId],
    );
}

export async function verifyPostOwnership(postId, userId) {
    const { rows } = await dbPool.query(
        `
        SELECT * FROM posts
        WHERE post_id = $1 AND user_id = $2
        `,
        [postId, userId],
    );

    return rows.length === 1;
}

export async function deletePost(postId) {
    await dbPool.query(
        `
        DELETE FROM posts
        WHERE post_id = $1
        `,
        [postId],
    );
}
