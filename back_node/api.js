import express from "express";
import maria from './consts.js';
maria.connect();  
const router = express.Router();


router.get("/", (req, res) => {
    res.send("이건 콘솔 로그로 보내집니다. 받을때 콘솔로그로 보내거든요");
});

// 로그인
router.post("/login", (req, res) => {
    const userId = req.body.user_id;
    const userPwd = req.body.user_pwd;

    maria.query('select * from user_table where user_id = ?', userId,
        (err, row, fields) => {
            console.log(row.length);
            if(!err) {
                if(row.length != 0){
                    const db_pwd = row[0].user_pwd;
                    if(db_pwd == userPwd) {
                        console.log("로그인성공");
                        res.send("success");
                    } else {
                        res.send('fail');
                    }
                } else {
                    res.send('empty');
                }                

            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

// 아이디 중복 체크
router.post("/idcheck", (req, res) => {
    const userId = req.body.inputid;
    maria.query('select * from user_table where user_id = ?', userId,
        (err, row, fields) => {
            if(!err) {
                // 아이디가 결과로 나오지 않아야 함
                if(row.length == 0){
                    res.send('success');
                } else {
                    res.send('empty');
                }                

            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

// 회원가입 
router.post("/signup", (req, res) => {
    const userId = req.body.id;
    const userPwd = req.body.pwd;
    const userEmail = req.body.email;
    maria.query('insert into user_table values (?,?,?)', [userId, userPwd, userEmail],
        (err, row, fields) => {
            if(!err) {         
                res.send('success');
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

// 게시물 리스트 불러오기 
router.post("/contentsload", (req, res) => {
    const b_num = req.body.b_num;
    maria.query('select content_num, content_title, user_id, content_like ' +
     'from content_table where board_type = ? order by content_num desc', b_num,
        (err, row, fields) => {
            if(!err) {         
                res.send(row);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

router.post("/detailload", (req, res) => {
    const c_num = req.body.c_num;
    maria.query('select * from content_table where content_num = ? ' , c_num,
        (err, row, fields) => {
            if(!err) {         
                res.send(row);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

router.post("/contentswrite", (req, res) => {
    maria.query('insert into content_table(user_id, content_title, content_detail, content_like, board_type) values ( ?, ?, ?, 0, ?);',
     [ req.body.user_id, req.body.title, req.body.content, req.body.b_num],
        (err, row, fields) => {
            if(!err) {   
                res.send(row);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

router.post("/latest", (req, res) => {
    maria.query('select content_num from content_table where user_id = ? order by content_num desc', req.body.user_id,
        (err, row, fields) => {
            if(!err) {   
                res.send(row[0]);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

router.post("/delete", (req, res) => {
    maria.query('DELETE FROM content_table WHERE content_num=?', req.body.c_num,
        (err, row, fields) => {
            if(!err) {   
                res.send(row);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

router.post("/modify", (req, res) => {
    maria.query('update content_table set content_title = ?, content_detail = ? where content_num = ?', 
    [req.body.title, req.body.content, req.body.c_num],
        (err, row, fields) => {
            if(!err) {   
                res.send(row[0]);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

router.post("/getreplylist", (req, res) => {
    maria.query('select * from reply_table where content_num = ?', req.body.c_num,
        (err, row, fields) => {
            if(!err) { 
                console.log(row);  
                res.send(row);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

router.post("/writereply", (req, res) => {
    maria.query('insert into reply_table(user_id, reply_content, content_num) values (? ,? ,?)',
     [req.body.user_id , req.body.content, req.body.c_num ],
        (err, row, fields) => {
            if(!err) { 
                console.log(row);  
                res.send(row);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

router.post("/deletereply", (req, res) => {
    maria.query('DELETE FROM content_table WHERE reply_num=?', req.body.c_num,
        (err, row, fields) => {
            if(!err) {   
                res.send(row);
            } else {
                console.log("err: " + err);
                res.send('err');
            }
    })
});

export default router;