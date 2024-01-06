import {
    Container,
    Row,
    Col
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const DetailContent = (props) => {
    const c_num = props.c_num;

    return (
        <Container>
            <Row>
                <Col md="9">
                    제목칸 {c_num}
                </Col>
                <Col>
                    작성자칸
                </Col>
            </Row>
            <Row>
                <Col>
                    내용칸
                </Col>
            </Row>
        </Container>
    )
}

export default DetailContent;