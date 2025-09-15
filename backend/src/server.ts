
import {ENV} from "./config/env";
import express, {type Express, Request, Response} from "express";
import cors from "cors";
import {clerkMiddleware} from '@clerk/express'
import userRoutes from "./routes/user.route";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.use('/api/users', userRoutes)

app.get("/", (req: Request, res: Response) => {
    return res.send("Hello World!");
});

app.listen(ENV.PORT, () => console.log(`Server started on port http://localhost:${ENV.PORT}`));