import {
    Container,
    Row,
    Col
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'react-router-dom';

// core components
// import HeaderBanner from "../../components/banner/banner.jsx";
// import Footer from "../../components/footer/footer.jsx";
import Header from "../../components/header.jsx";
import Login from "../login/login.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Navi from "../nav/nav.jsx";

import DetailContent from "./section/detailcontent.jsx";
import Reply from "./section/reply.jsx";
import { useEffect } from "react";


  const Detail = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("c_num"));

    useEffect(() => {
        
    },[]);

    return (
      <Container id="main-wrapper" className="border">
        <Row>
          <Header/>
        </Row>
        <Row>
          <Col md='9' className="border" id="page-wrapper" >
            <DetailContent c_num={searchParams.get("c_num")} />
            <br/>
            <Reply c_num={searchParams.get("c_num")} />
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