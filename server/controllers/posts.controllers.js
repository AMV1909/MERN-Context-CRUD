import postSchema from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

const local = (req, res) => {
    res.send("Hello World");
};

const getPost = (req, res) => {
    postSchema
        .findById(req.params.id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

const getPosts = async (req, res) => {
    postSchema
        .find()
        .then((posts) => res.json(posts))
        .catch((err) => res.status(400).json("Error: " + err));
};

const createPost = async (req, res) => {
    const { title, description } = req.body;
    let image;

    if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        image = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        await fs.remove(req.files.image.tempFilePath);
    }

    const newPost = new postSchema({ title, description, image });

    newPost
        .save()
        .then((data) => res.json(data))
        .catch(async (err) => {
            if (image) {
                await deleteImage(image.public_id);
            }

            res.status(400).json("Error: " + err);
        });
};

const updatePost = async (req, res) => {
    const { title, description } = req.body;
    let image;

    if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        image = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        await fs.remove(req.files.image.tempFilePath);
    }

    await postSchema
        .findByIdAndUpdate(req.params.id, { title, description, image })
        .then(async (data) => {
            if (image) {
                await deleteImage(data.image.public_id);
            }

            res.json(data);
        })
        .catch(async (err) => {
            if (image) {
                await deleteImage(image.public_id);
            }

            res.status(400).json("Error: " + err);
        });
};

const deletePost = (req, res) => {
    postSchema
        .findByIdAndDelete(req.params.id)
        .then(async (data) => {
            if (data.image.public_id) {
                await deleteImage(data.image.public_id);
            }

            res.send("Post deleted");
        })
        .catch((err) => res.status(400).json("Error: " + err));
};

export { local, getPost, getPosts, createPost, updatePost, deletePost };
