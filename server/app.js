import express from "express";
import fileUpload from "express-fileupload";

import { router as postsRouter } from "./routes/posts.routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload"
}));

// Routes
app.use(postsRouter);

export { app };