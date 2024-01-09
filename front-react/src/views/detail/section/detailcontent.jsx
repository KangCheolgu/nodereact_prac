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


const DetailContent = (props) => {
    const c_num = props.c_num;
    const content = props.content;
    // const [content, setContent] = useState();
    let navigate = useNavigate();
    const [showMode, setShowMode] = useState("NormalMode");


    const checkShowMode = async () => {
        console.log(content);
        console.log(cookie.load("isLogin"));
        if(content.writer === cookie.load("isLogin")){
            setShowMode("MyContentMode")
        } else {
            setShowMode("NormalMode")
        }
    }

    // title과 content의 disabled를 제거한다.
    const modifyMode = () => {
        const target_title = document.getElementById('detail_title');
        const target_content = document.getElementById('detail_content');
        target_title.disabled = false;
        target_content.disabled = false;
        setShowMode("ModifyMode")
    }

    const deleteContent = () => {
        axios.post('/api/delete', {
            c_num : c_num
          })
          .then(function (response) {
            let res = response.data;
            console.log(res);
            alert('게시물이 삭제되었습니다');
            navigate('/board');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const likeContent = () => {
        // axios 
        axios.post('/api/likeup', {
            c_num : c_num
          })
          .then(function (response) {
            let res = response.data;
            console.log(res);
            navigate('/board');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const modiftCancel = () => {
        checkShowMode();
        window.location.reload();
    }

    const modifyConfirm = () => {
        const target_title = document.getElementById('detail_title').value;
        const target_content = document.getElementById('detail_content').value;
        const target_cnum = document.getElementById('c_num').value;

        console.log(target_title);
        console.log(target_content);
        console.log(target_cnum);
        // axios update
        axios.post('/api/modify', {
            title : target_title,
            content : target_content,
            c_num : target_cnum
          })
          .then(function (response) {
            alert("수정이 완료되었습니다.")
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
    }
        const backToList = () => {
        navigate("/board");
    }


    useEffect(() => {
        checkShowMode();
    },[]);

    return (
        <Container>
            <hr />
            <Row>
                <Col md="1">
                    <Input id="c_num" value={c_num} disabled style={{backgroundColor:"white", padding:"6px", textAlign:"center"}}/>
                </Col>
                <Col md="8">
                    <Input id="detail_title" placeholder={content.title} disabled style={{backgroundColor:"white", padding:"6px"}}></Input>
                </Col>
                <Col>
                    <Input value={content.writer} disabled style={{backgroundColor:"white", padding:"6px",  textAlign:"center"}}/>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <textarea id="detail_content" style={{width:"100%",minHeight:"200px"}} placeholder={content.title} disabled></textarea>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col></Col>
                { showMode === "NormalMode" && 
                <>
                    <Col style={{textAlign:"center"}}>
                        <Button onClick={() => {
                            likeContent();
                        }}>좋아요 {content.like}</Button>
                    </Col>
                </>
                }
                { showMode === "MyContentMode" && 
                <>
                    <Col style={{textAlign:"center"}}>
                        <Button onClick={() => {
                            likeContent();
                        }}>좋아요 {content.like}</Button>
                    </Col>
                    <Col style={{textAlign:"center"}}>
                        <Button onClick={() => {
                            modifyMode();
                        }}>수정</Button>
                    </Col>
                    <Col style={{textAlign:"center"}}>
                        <Button onClick={() => {
                            deleteContent();
                        }}>삭제</Button>
                    </Col>
                </>
                }
                { showMode === "ModifyMode" && 
                <>
                    <Col style={{textAlign:"center"}}>
                        <Button onClick={() => {
                            modifyConfirm();
                        }}>수정 완료</Button>
                    </Col>
                    <Col style={{textAlign:"center"}}>
                        <Button onClick={() => {
                            modiftCancel();
                        }}>수정 취소</Button>
                    </Col>
                </>
                }
                <Col style={{textAlign:"center"}}>
                    <Button onClick={() => {
                            backToList();
                        }}>목록</Button>
                </Col>
                <Col></Col>
            </Row>
            <hr />
        </Container>
    )
}

export default DetailContent;