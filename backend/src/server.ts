import "dotenv/config"
import express, {Express} from "express";

const app:Express = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});