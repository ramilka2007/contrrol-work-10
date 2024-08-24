import {Router} from 'express';
import {CommentMutation, Comment} from "../types";
import commentDb from "../commentDb";
import newDb from "../newDb";

const commentsRouter = Router();

commentsRouter.post('/',  async (req, res) => {
    if (!req.body.news_id || !req.body.comment) {
        res.status(404).send({"error": "Text and News_id must be present in the request"});
    }

    let checkNewsId = await newDb.findNewsById(req.body.news_id);

    if (checkNewsId === null) {
        return res.status(404).send({error: "news not found"});
    }

    if (checkNewsId !== null) {
        let newComment: CommentMutation = {
            news_id: req.body.news_id,
            author: req.body.author ? req.body.author : 'Anonymous',
            comment: req.body.comment,
        };

        newComment = await commentDb.addItem(newComment);
        return res.send(newComment);
    } else {
        return res.status(404).send({error: "news_id not found"});
    }
});

commentsRouter.get('/', async (req, res) => {
    let comments: Comment[] = [];

    if (req.query.news_id) {
        let comment = await commentDb.findCommentByNewsId(String(req.query.news_id));
        if (comment !== null) {
            res.send(comment);
        } else {
            res.status(404).send({error: "comment not found"});
        }
    } else {
        comments = await commentDb.getItems();
        res.send(comments);
    }
});


commentsRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let comment = await commentDb.deleteCommentById(req.params.id);

    if (comment !== null) {
        res.send(comment);
    } else {
        res.status(404).send({error: "comment not found"});
    }
});


export default commentsRouter