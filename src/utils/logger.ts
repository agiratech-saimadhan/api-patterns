import path from "path";
import { pinoHttp, Options } from "pino-http";
import pinoPretty from "pino-pretty";

const pino = pinoHttp({
  customLogLevel: (res, err) => {
    if (res.statusCode! >= 400 && res.statusCode! < 500) {
      return "warn";
    } else if (res.statusCode! >= 500 || err) {
      return "error";
    }
    return "info";
  },
  prettifier: pinoPretty,
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: { destination: `${path.join(__dirname, '../../.log')}` },
      },
      {
        target: 'pino/file'
      },
    ],
  }
} as unknown as Options);

const logger = pino.logger;

export { pino, logger };