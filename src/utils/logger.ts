import path from "path";
import pino, { TransportMultiOptions, TransportTargetOptions } from "pino";
import pinoPretty from "pino-pretty";

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `${path.join(__dirname, "../../.log")}` },
      level: "trace",
    },
    {
      target: "pino-pretty",
      level: "trace",
    },
  ],
} as TransportMultiOptions);

const logger = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
    prettifier: pinoPretty,
    redact: {
      paths: [
        "name",
        "address",
        "passport",
        "phone",
        "authorization",
        "user.name",
        "user.address",
        "user.passport",
        "user.phone",
        "header.authorization",
        "*.user.name", // * is a wildcard covering a depth of 1
        "*.user.address",
        "*.user.passport",
        "*.user.phone",
        "*.authorization",
        "*.headers.authorization",
      ],
      censor: "[API REDACTED]",
    },
  },
  transport
);

export default logger;
