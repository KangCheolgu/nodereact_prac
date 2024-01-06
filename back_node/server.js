import express from 'express';
import {fileURLToPath} from 'url';
import path from "path";
import dotenv from 'dotenv';
import test from './test.js';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

import maria from './consts.js';
maria.connect();  

// dotenv.config();
const app = express();
app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.send('Hello, Express');
});
app.use("/api", test);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
// console.log(express.json());
// app.use(express.json());

// app.get('/select', (req, res, next) => {
//     maria.query('select * from user_table', (err, row, fields) => {
//         if(!err) {
//             console.log("success");
//             res.send(row);
//         } else {
//             console.log("err: " + err);
//         }
//     })
// });

// app.post('/login', (req, res, next) => {
//     console.log(req);
//     maria.query('select user_id, user_pwd from user_table where user_id = ?',req.userid, (err, row, fields) => {
//         if(!err) {
//             console.log("success");
//             res.send(row);
//         } else {
//             console.log("err: " + err);
//         }
//     })
// });

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});
