import {ENV} from "./config/env";
import express, {Express, Request, Response} from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    return res.send("Hello World!");
});

app.listen(9000, () => console.log(`Server started on port http://localhost:${ENV.PORT}`));