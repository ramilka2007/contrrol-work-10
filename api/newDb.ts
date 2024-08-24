import {promises as fs} from 'fs';
import crypto from 'crypto';
import {New, NewMutation} from './types';

const filename = './news.json';
let data: New[] = [];

const newDb = {
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
    async addItem(item: NewMutation) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const newNew = {id, ...item, date};
        data.push(newNew);
        await this.save();
        return newNew;
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default newDb;
