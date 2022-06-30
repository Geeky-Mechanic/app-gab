import connect from "../db";
import Contact from "../models/Contact";
import {
    createRequire
} from 'node:module';
const require = createRequire(import.meta.url);
const dotenv = require('dotenv');
dotenv.config();

export async function post(event){
    try {
        await connect();
        const req = await event.request.json();
        const newContact = new Contact({
            name: req.name,
            email: req.email,
            lName: req.lname,
            subj: req.subj,
            desc: req.desc,
            date: new Date().getTime(),
            answered: false,
        });
        await newContact.save();
        return {
            status: 200,
        }
    } catch(err){
        console.log(err);
        return {
            body: err,
            status: 500,
        }
    }
}