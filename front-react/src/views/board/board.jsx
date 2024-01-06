import {
    Container,
    Row,
    Col
  } from "reactstrap";
  import 'bootstrap/dist/css/bootstrap.min.css';
  
  // core components
  // import HeaderBanner from "../../components/banner/banner.jsx";
  // import Footer from "../../components/footer/footer.jsx";
  import Header from "../../components/header.jsx";
  import Login from "../login/login.jsx";
  import FreeBoard from "../board/sections/freeboard.jsx";
  import Sidebar from "../sidebar/sidebar.jsx";
  import Navi from "../nav/nav.jsx";
  
  const Board = () => {
  
    return (
      <Container id="main-wrapper" className="border">
        <Row>
          <Header/>
        </Row>
        <Row>
          <Col md='9' className="border" id="page-wrapper" >
            <FreeBoard />
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
  
  export default Board;