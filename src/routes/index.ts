import { Express, Request, Response } from "express";
import {
  createShortUrl,
  handleRedirect,
} from "../controller/shortUrlController";
import validateResource from "../middleware/validateResource";
import shortUrlSchema from "../schemas/createShortUrl";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.send("App is looking good");
});

app.post("/shorten", validateResource(shortUrlSchema), createShortUrl);
app.get("/:identifier", handleRedirect);


}

export default routes;