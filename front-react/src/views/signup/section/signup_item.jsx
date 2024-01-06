import {
  Container,
  Row,
  Col
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate} from "react-router-dom";


const style_hr = {
  margin:"10px 0 10px 0"
}

const confirm_button_style = {
  width:"100px"
}

const Signup_item = () => {
  let navigate = useNavigate();

  const signupInfo = ({
    id: "",
    pwd: "",
    id_check: false,
    email: ""
  });

  const id_check = async () => {
    const check_id = document.getElementById('id_input').value;

    if(check_id === "") {
      alert('아이디를 입력해주세요.')
      return;
    }

    axios.post('/api/idcheck', {
      inputid : check_id
    })
    .then(function (response) {
      let res = response.data;
      console.log(res);
      if(res === 'success') { 
        signupInfo.id_check = true;
        alert('사용가능한 아이디 입니다.');
      } else {
        signupInfo.id_check = false;
        console.log("사용 불가한 아이디 입니다.");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const signup = async () => {
    const id = document.getElementById('id_input').value;
    const pwd = document.getElementById('password_input').value;
    const pwd_c = document.getElementById('password_confirm').value;
    const email = document.getElementById('email_input').value;

    if (signupInfo.id_check === false) {
      alert('아이디 중복 체크를 해주세요.');
    } else if (pwd !== pwd_c) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (email === "") {
      alert("이메일을 입력해 주십시오.")
    } else {
      signupInfo.id = id;
      signupInfo.pwd = pwd;
      signupInfo.email = email;

      axios.post('/api/signup', signupInfo)
      .then(function (response) {
        let res = response.data;
        console.log(res);
        if(res === 'success') { 
          navigate("/");
          alert('회원가입이 완료되었습니다.');
        } else {
          signupInfo.id_check = false;
          console.log("다시 시도해 주십시오.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }  
  }

  return (
    <Container>
      <Row id="signup_id_wrapper">
        <p id="signup_id">회원 가입</p>
      </Row>
      <hr style={style_hr}/>
      <Row>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;아이디 입력
      </Row>
      <hr style={style_hr}/>
      <Row style={{marginTop:"10px"}}>
        <Col md="8">
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="id_input" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">아이디를 입력해 주세요</label>
          </div>
        </Col>
        <Col>
          <button id="id_check_button" type="button" className="btn btn-secondary" onClick={() => id_check()}>아이디 중복 확인</button>
        </Col>
      </Row>
      <hr style={style_hr}/>
      <Row>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호 입력
      </Row>
      <hr style={style_hr}/>
      <Row>
        <Col>
          <div className="form-floating">
            <input type="password" className="form-control" id="password_input" placeholder="Password"/>
            <label htmlFor="password_input">비밀번호를 입력해주세요</label>
          </div>
        </Col>
        <Col>
          <div className="form-floating">
            <input type="password" className="form-control" id="password_confirm" placeholder="Password"/>
            <label htmlFor="password_confirm">비밀번호 확인</label>
          </div>
        </Col>
      </Row>
      <hr style={style_hr}/>
      <Row>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이메일 입력
      </Row>
      <hr style={style_hr}/>
      <Row style={{marginTop:"20px"}}>
        <Col>
          <div className="form-floating">
            <input type="email" className="form-control" id="email_input" placeholder="Password"/>
            <label htmlFor="email_input">이메일을 입력해 주세요</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <button id="confirm_button" type="button" className="btn btn-secondary" style={{confirm_button_style}} 
          onClick={() => {signup()}}>
            회원가입
          </button>
        </Col>
      </Row>
    </Container>
  );
};
  
  export default Signup_item;