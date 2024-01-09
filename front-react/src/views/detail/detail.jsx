import {
    Container,
    Row,
    Col
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Await, useSearchParams } from 'react-router-dom';

// core components
// import HeaderBanner from "../../components/banner/banner.jsx";
// import Footer from "../../components/footer/footer.jsx";
import Header from "../../components/header.jsx";
import Login from "../login/login.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Navi from "../nav/nav.jsx";

import DetailContent from "./section/detailcontent.jsx";
import Reply from "./section/reply.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Detail = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const c_num = searchParams.get("c_num");

  const [content, setContent] =  useState();

// const load_content = async () => {
//   let test = await axios.post('/api/detailload', {
//       c_num : c_num
//     })
//     .then(function (response) {
//       let res = response.data;
//       // console.log(res);
//       return res
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   console.log(test);

//   setContent({
//     title : test[0].content_title,
//     writer : test[0].user_id,
//     detail : test[0].content_detail,
//     like : test[0].content_like
//   })
// }

useEffect(() => {
  async function fetchData(){
    const response =  await axios.post('/api/detailload', {
      c_num : c_num
    })
    .then(function (response) {
      let res = response.data;
      // console.log(res);
      return res
    })

  setContent({
    title : response[0].content_title,
    writer : response[0].user_id,
    detail : response[0].content_detail,
    like : response[0].content_like
  })
  }
  fetchData()
  // load_content();
},[]);

  return (
    <Container id="main-wrapper" className="border">
      <Row>
        <Header/>
      </Row>
      <Row>
        <Col md='9' className="border" id="page-wrapper" >
          {content && (
          <>
            <DetailContent c_num={c_num} content={content} />
            <br/>
            <Reply c_num={c_num} />
          </>
          )}
        </Col>
        <Col className="border" id="side-wrapper">
            <Login />
            <Sidebar />
            <Navi />
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;