import {
    Container,
    Row,
    Col,
    Input,
    Button
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import cookie from 'react-cookies';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';



const WriteContent = () => {
    const user_id = cookie.load('isLogin');
    let navigate = useNavigate();
    const [boardMode, setBoardMode] = useState('자유게시판');

    const writeConfirm = () => {
        const title = document.getElementById('new_title').value;
        const content = document.getElementById('new_content').value;
        const user_id = cookie.load('isLogin');
        let b_num = 0;

        console.log(user_id);
        console.log("boardMode "+boardMode);
        if(boardMode === '자유게시판') {
            b_num = 0;
        } else if (boardMode === '유머게시판') {
            b_num = 1;
        } else {
            b_num = 2;
        }

        if( user_id === undefined){
            alert("다시 로그인 해주십시오");
            navigate("/");
            return;
        } else if (b_num === null){
            alert("오류가 발생하였습니다.");
            navigate("/");
            return;
        }

        axios.post('/api/contentswrite', {
            b_num : b_num,
            user_id : user_id,
            title : title,
            content : content
          })
          .then(function (response) {
            let res = response.data;
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
            alert("다시 시도하여 주십시오.")
          });
        
        axios.post('/api/latest', {
            user_id : user_id
          })
        .then(function (response) {
            let res = response.data;
            alert("작성이 완료되었습니다.")
            navigate("/detail?c_num="+res.content_num);
          })
          .catch(function (error) {
            console.log(error);
            alert("다시 시도하여 주십시오.")
          });
    }

    const backToList = () => {
        navigate("/board");
    }

    const changeToggle = (mode) => {
        setBoardMode(mode);
    }

    return (
        <Container>
            <hr />
            <Row>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle id="board_mode" variant="success">
                            {boardMode}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {changeToggle('자유게시판')}}>자유게시판</Dropdown.Item>
                            <Dropdown.Item onClick={() => {changeToggle('유머게시판')}}>유머게시판</Dropdown.Item>
                            <Dropdown.Item onClick={() => {changeToggle('게임게시판')}}>게임게시판</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md="8">
                    <Input id="new_title" style={{backgroundColor:"white", padding:"6px"}}/>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <textarea id="new_content" style={{width:"100%",minHeight:"200px"}}></textarea>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col></Col>
                <Col style={{textAlign:"center"}}>
                    <Button onClick={() => {
                            writeConfirm();
                        }}>글작성</Button>
                </Col>
                <Col style={{textAlign:"center"}}>
                    <Button onClick={() => {
                            backToList();
                        }}>작성 취소</Button>
                </Col>
                <Col></Col>
            </Row>
            <hr />
        </Container>
    )
}

export default WriteContent;