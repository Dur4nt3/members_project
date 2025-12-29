import bcrypt from 'bcryptjs';

export async function validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

export async function generatePassword(password) {
    return await bcrypt.hash(password, 10);
}
