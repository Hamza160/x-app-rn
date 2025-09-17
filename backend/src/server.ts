
import {ENV} from "./config/env";
import express, {type Express, Request, Response} from "express";
import cors from "cors";
import {clerkMiddleware} from '@clerk/express'
import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
import notificationRoutes from "./routes/notification.route";
import {errorHandlerMiddleware, notFound} from "./middleware/errorHandler.middleware";
import {arcjetMiddleware} from "./middleware/arcjet.middleware";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(clerkMiddleware())
app.use(arcjetMiddleware)

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/notifications', notificationRoutes)

app.get("/", (req: Request, res: Response) => {
    return res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(ENV.PORT, () => console.log(`Server started on port http://localhost:${ENV.PORT}`));