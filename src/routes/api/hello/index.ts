import { Router } from "express";
import { versionMiddleware } from "../../../middlewares/versionMiddleware";
import sayHelloV2 from "../../../handlers/hello/sayHello/sayHello.v2";
import sayHello from "../../../handlers/hello/sayHello/sayHello";

const helloRouter = Router({ mergeParams: true });

helloRouter.get("/", versionMiddleware(2), sayHelloV2);
helloRouter.get("/", sayHello);

export default helloRouter;
