import express from 'express';
import {fileURLToPath} from 'url';
import path from "path";
import api from "./api.js";
import bodyParser from 'body-parser';

const __dirname = fileURLToPath(path.dirname(import.meta.url));
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.env.PORT || 5000);

app.use("/api", api);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});