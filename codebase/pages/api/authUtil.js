import bcrypt from "bcrypt";

export async function hashPassword(password) {
  if (!password) { return { hashedPassword: null, salt: null}};
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { hashedPassword, salt };
}

export async function validatePassword(hashedPassword, salt, password) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}

export function generateUserName(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomtString = "";
  for (let i = 0; i < length; i++) {
    randomtString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomtString;
}

export function isExpertsLogin(req) {
  const isExpertSignin = req?.body?.callbackUrl?.includes("/experts/signin");
  const isExpertSignup = req?.body?.callbackUrl?.includes("/experts/signup");

  console.log("isExpertSignin - ", isExpertSignin);
  console.log("isExpertSignup - ", isExpertSignup);

  return (isExpertSignin || isExpertSignup);
}