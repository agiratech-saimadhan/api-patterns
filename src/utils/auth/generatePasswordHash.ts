import crypto from "crypto";

interface PasswordHash {
  salt: string;
  hash: string;
}

function generatePasswordHash(password: string): PasswordHash {
  const salt = crypto.randomBytes(32).toString("hex");
  const generatedHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt,
    hash: generatedHash,
  };
}

export default generatePasswordHash;
