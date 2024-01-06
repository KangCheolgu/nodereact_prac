import {
    Container,
    Row,
    Col
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Reply = () => {
    return (
        <Container>
            <Row>
                <Col md="9">
                    제목칸
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

export default Reply;