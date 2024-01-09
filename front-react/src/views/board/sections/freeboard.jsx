import { Container, Row, Col, Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Paging from './pagination'
import {useNavigate} from "react-router-dom";
import cookie from "react-cookies"
const FreeBoard = () => {

    const [boardList, setBoardList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    let navigate = useNavigate();

    const navi_detail = (content_num) => {
        navigate("/detail?c_num="+content_num);
    }

    const content_write = () => {
        if(cookie.load("isLogin") === undefined){
            alert("로그인후 사용해 주십시오")
        } else {
            navigate("/write");
        }
    }
    

    const contents_list_load = (b_num) => {

        axios.post('/api/contentsload', {
            b_num : b_num
          })
          .then(function (response) {
            let res = response.data;
            console.log(res);
            setBoardList(res);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    useEffect(() => {
        // 처음 페이지 로딩될때 자유게시판의 모든 게시물을 불러온다.
        contents_list_load(0);
    },[]);

    return (
        <div id="board-wrapper" style={{textAlign:"center"}}>
            <h1> 자유 게시판 </h1>
            <label>
                페이지 당 표시할 게시물 수:&nbsp;
                <select
                type="number"
                value={limit}
                onChange={({ target: { value } }) => setLimit(Number(value))}
                >
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                </select>
            </label>

            <Container style={{border:'solid 1px'}}>
                <Row style={{backgroundColor:"green"}}>
                    <Col style={{border:'solid 1px'}}>번호</Col>
                    <Col md="8" style={{border:'solid 1px'}}>제목</Col>
                    <Col md="2" style={{border:'solid 1px'}}>작성자</Col>
                    <Col style={{border:'solid 1px'}}>추천</Col>
                </Row>
                {boardList && boardList.slice(offset, offset + limit).map((board) => (
                    <Row style={{border:'solid 1px'}} onClick={(event) => {
                        navi_detail(board.content_num)
                    }}>
                            <Col>{board.content_num}</Col>
                            <Col md="8">{board.content_title}</Col>
                            <Col md="2">{board.user_id}</Col>
                            <Col>{board.content_like}</Col>
                    </Row>
                ))}

                <Row>
                    <Col>
                        <Paging total={boardList.length} limit={limit} page={page} setPage={setPage}>
                        </Paging>
                    </Col>
                    <Col>
                        <Button onClick={() => {
                            content_write(0);
                        }}>글쓰기</Button>
                    </Col>
                </Row>  
            </Container>
        </div>
    );
  };
  export default FreeBoard;