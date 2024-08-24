import express from "express";
import {imagesUpload} from "../multer";
import {NewMutation} from "../types";
import newDb from "../newDb";

const newsRouter = express.Router();

newsRouter.post("/", imagesUpload.single('image'), async (req, res) => {
    if (!req.body.title && !req.body.description) {
        return res.status(404).send({"error": "Name and description are required"});
    }

    let post: NewMutation = {
        title: req.body.title,
        text: req.body.text,
        image: req.file ? req.file.filename : null,
    };

    const newPost = await newDb.addItem(post)

    return res.send(newPost);
});

export default newsRouter;