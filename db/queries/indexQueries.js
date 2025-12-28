import dbPool from '../dbPool.js';

export async function getAllPosts() {
    const { rows } = await dbPool.query(`SELECT * FROM posts`);

    return rows;
}