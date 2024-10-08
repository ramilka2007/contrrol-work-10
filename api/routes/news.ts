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

    const newPost = await newDb.addItem(post);

    return res.send(newPost);
});

newsRouter.get("/", async (req, res) => {
    const news = await newDb.getItems();

    return res.send(news)
});

newsRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({"error": "Id params must be in url"});
    }

    let news = await newDb.deleteNewsById(req.params.id);

    if (news !== null) {
        return res.send(news);
    } else {
        return res.status(404).send({error: "news not found"});
    }

});

newsRouter.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let news = await newDb.findNewsById(req.params.id);

    if (news === undefined || news === null) {
        res.status(404).send({error: "news not found"});
    }

    if (news !== null) {
        res.send(news);
    }
});

export default newsRouter;