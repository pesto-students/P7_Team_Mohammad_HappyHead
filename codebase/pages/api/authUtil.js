import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { hashedPassword, salt };
}

export async function validatePassword(hashedPassword, salt, password) {
  const isValid = await bcrypt.compare(password, hashedPassword); 
  return isValid;
}
