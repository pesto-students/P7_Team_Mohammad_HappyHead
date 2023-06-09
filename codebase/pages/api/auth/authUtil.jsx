import bcrypt from 'bcrypt';


export async function hashPassword(password, salt) {
    if (!salt) {
        salt = await bcrypt.genSalt(10);
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    return {hashedPassword, salt}
}