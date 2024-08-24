import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Comment, CommentMutation} from './types';

const filename = './comments.json';
let data: Comment[] = [];

const commentDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(news: CommentMutation) {
        const id = crypto.randomUUID();
        const newComment = {...news, id}

        data.push(newComment);
        await this.save();

        return newComment;
    },
    async findCommentById(id: string) {

        if (data.length > 0 && id) {
            let comment: Comment | undefined = data.find(comments => comments.id === id);

            if (comment !== undefined) {
                return comment;
            } else  {
                return null;
            }
        }
    },
    async findCommentByNewsId(id: string) {

        if (data.length > 0 && id) {
            let comments: Comment[] = [];

            data.forEach(comment => {
                if (comment.news_id === id) {
                    comments.push(comment);
                }
            });

            return comments.reverse();
        }
    },


    async deleteCommentById(id: string) {
        if (data.length > 0 && id) {
            let comment = await this.findCommentById(id);

            if (comment === null) {
                return null;
            }

            if (comment) {
                data = data.filter(comment => comment.id !== id);
                await this.save();
                return 'Comment was deleted';
            }
        }
    },
    async save(dataToUpdate?: Comment[]) {
        if (dataToUpdate === undefined) dataToUpdate = data;
        return fs.writeFile(filename, JSON.stringify(dataToUpdate, null, 2));
    },
};

export default commentDb;
