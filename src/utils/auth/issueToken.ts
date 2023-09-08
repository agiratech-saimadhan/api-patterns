import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

interface User {
  _id: string;
}

interface Token {
  access_token: string;
  expiresIn: string;
}

function issueToken(user: User): Token {
  const pathToKey = path.join(__dirname, "../../../id_rsa_priv.pem");
  const privateKey = fs.readFileSync(pathToKey, "utf8");

  const { _id } = user;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, privateKey, {
    expiresIn,
    algorithm: "RS256",
  });

  return {
    access_token: `Bearer ${signedToken}`,
    expiresIn,
  };
}

export default issueToken;
