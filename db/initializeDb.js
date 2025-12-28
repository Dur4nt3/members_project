#! /usr/bin/env node

import 'dotenv/config';
import { Client } from 'pg';
import connectionURL from './connectionURL.js';

const SQL = `
CREATE TABLE IF NOT EXISTS users (
user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR (255),
password VARCHAR(255),
first_name VARCHAR(255),
last_name VARCHAR(255),
member BOOLEAN,
admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS posts (
post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR (255),
body VARCHAR (1000),
added TIMESTAMP,
user_id INTEGER REFERENCES users (user_id)
);
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: connectionURL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();