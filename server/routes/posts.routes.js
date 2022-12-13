import { Router } from "express";

import { createPost, deletePost, getPost, getPosts, local, updatePost } from "../controllers/posts.controllers.js";

const router = Router();

router.get("/", local);

router.get("/posts/:id", getPost);

router.get("/posts", getPosts);

router.post("/posts", createPost);

router.put("/posts/:id", updatePost);

router.delete("/posts/:id", deletePost);

export { router };