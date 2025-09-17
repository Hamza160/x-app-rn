
import {ENV} from "./config/env";
import express, {type Express, Request, Response} from "express";
import cors from "cors";
import {clerkMiddleware} from '@clerk/express'
import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
import {errorHandler, notFound} from "./middleware/errorHandler";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.get("/", (req: Request, res: Response) => {
    return res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(ENV.PORT, () => console.log(`Server started on port http://localhost:${ENV.PORT}`));