import crypto from "crypto";

function validatePassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === verifyHash;
}

export default validatePassword;
