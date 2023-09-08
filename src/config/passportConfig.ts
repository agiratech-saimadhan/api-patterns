import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import path from "path";
import fs from "fs";
import { PassportStatic } from "passport";
import User from "../data/models/users";
import { logger } from "../utils/logger";

const pathToKey = path.join(__dirname, "../../id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  const user = await User.findById(payload.sub);

  if (!user) {
    return done(null, false);
  } else {
    return done(null, { id: user._id, name: user.name, email: user.email });
  }
});

export default jwtStrategy;
