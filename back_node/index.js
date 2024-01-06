import express from 'express';
import path from "path";
import {fileURLToPath} from 'url';
import maria from './consts.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {title: '꼬북'});
});

router.get('/select', (req, res, next) => [
    maria.query('select * from user_table', (err, row, fields) => {
        if(!err) {
            console.log("success");
            res.send(rows);
        } else {
            console.log("err: " + err);
        }
    })
])

export default router;
