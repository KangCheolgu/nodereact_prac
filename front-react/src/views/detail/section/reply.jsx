import {
    Container,
    Row,
    Col
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import cookie from 'react-cookies';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Reply = (props) => {
    const [replyList, setReplyList] = useState([]);
    const target_cnum = props.c_num;
    const cur_user = cookie.load('isLogin');

    const reply_list_load = () => {
        axios.post('/api/getreplylist', {
            c_num : target_cnum
        })
        .then(function (response) {
            let res = response.data;
            setReplyList(res);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const write_reply = () => {
        const target_content = document.getElementById('reply_content').value;

        axios.post('/api/writereply', {
            c_num : target_cnum,
            user_id: cur_user,
            content: target_content
        })
        .then(function (response) {
            let res = response.data;
            console.log(res);
            alert("댓글 작성이 완료되었습니다.");
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const delete_reply = () => {
        const reply_num = 
        axios.post('/api/deletereply', {
            c_num : target_cnum
          })
          .then(function (response) {
            let res = response.data;
            console.log(res);
            alert('게시물이 삭제되었습니다');
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
        reply_list_load();
    },[]);

    return (
        <>
            { cur_user !== undefined && 
                <>
                    <Container style={{border:"solid 1px"}}>
                        <Row>
                            <Col md="8">
                                {cur_user}
                            </Col>
                            <Col></Col>
                            <Col style={{textAlign:"center"}}>
                                <a href="#" onClick={() => {write_reply()}}>작성하기</a>
                            </Col>
                        </Row>
                        <hr style={{margin:"5px 0 10px 0"}}/>
                        <Row>
                            <Col>
                                <textarea id="reply_content" style={{width:"100%",height:"50px"}}></textarea>
                            </Col>
                        </Row>
                    </Container>
                    <hr />
                </>
            }

            <Container style={{border:"solid 1px"}}>
                {replyList && replyList.map((reply) => (
                <Container style={{border:"solid 1px", margin:"5px 0 5px 0", height:"100px"}}>
                    <Row className="reply_num_container" hidden>{reply.reply_num} </Row>
                    <Row style={{border:'solid 1px'}}>
                        <Col md="8">
                            {reply.user_id}
                        </Col>
                        <Col>
                        </Col>
                        <Col style={{textAlign:"center"}}>
                            <a href="#" onClick={() => {delete_reply(reply.reply_num)}}>삭제</a>
                        </Col>
                    </Row>
                    <hr style={{margin:"0"}}/>
                    <Row>
                        <Col>
                            {reply.reply_content}
                        </Col>
                    </Row>
                </Container>
                ))}
            </Container>
        </>
    )
}

export default Reply;