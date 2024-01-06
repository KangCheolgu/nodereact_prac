import React, {  useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import cookie from 'react-cookies';
import axios from "axios";

const Login = () => {

  let navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    id: "",
    pwd: "",
  });

  const [isLogin, setIsLogin] = useState(false); //로그인 관리

  const Logining = () => {
    return (
        <div id="login-wrapper">
            환영합니다! <br></br>
            <button onClick={(event)=> {
              event.preventDefault();
              logoutHandler()
            }}>로그아웃</button>
            <button>정보수정</button>      
        </div>
    )
  }

  const Login_not = () => {
    return (
      <div id="login-wrapper">
      <form action="/login" method="POST">
        <p>아이디<br/><input type="text" id="userid_login"></input></p>
        <p>패스워드<br/><input  type="password" id="userpwd_login"></input></p>
        <button value="Login" onClick={(event) => {
          event.preventDefault();
          login_try();
        }}>로그인</button>&nbsp;&nbsp;<a type="button" href="/signup" >회원가입</a>
      </form>
    </div>
    )
  }

  const loginMode = () => {
    if(isLogin === false) {
      return (
        <Login_not />
      );
    } else {
      return (
        <Logining />
      );
    }
  }

  useEffect(() => {
    console.log(cookie.load("isLogin"));
    if (cookie.load("isLogin") === undefined) {
      // 쿠키에 name 라는 key 값으로 저장된 값이 없다면
      console.log("isLogin ?? :: ", isLogin);
    } else if (isLogin === true) {
      navigate("/");
    } else {
      // 쿠키에 name 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true);
      console.log("isLogin ?? :: ", isLogin);
    }
  },[]);

  const loginHandler = (_userId) => {
    alert("로그인 성공!");
    cookie.save('isLogin', _userId);
    setIsLogin(true);
  };

const logoutHandler = () => {
    alert('로그아웃 되었습니다!');
    cookie.remove('isLogin');
    setIsLogin(false);
}

  const login_try = async () => {

    loginInfo.id = document.getElementById('userid_login').value;
    loginInfo.pwd = document.getElementById('userpwd_login').value;

    if (loginInfo.id === "") {
      alert("아이디를 입력해주십시오");
      return;
    }
    if (loginInfo.pwd === "") {
      alert("비밀번호를 입력해주십시오");
      return;
    }

    console.log(JSON.stringify(loginInfo));

    axios.post('/api/login', {
      user_id: loginInfo.id,
      user_pwd: loginInfo.pwd
    })
    .then(function (response) {
      let res = response.data;
      console.log(res);
      if(res === 'success') {
          loginHandler(loginInfo.id);
          
      } else if (res === 'fail') {
          console.log("로그인 실패 다시 시도해 주세요");
      } else if ( res === 'empty' ) {
          console.log("회원 정보가 없습니다.");
      } else {
          console.log("다시 시도하여 주십시오.");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return loginMode();
};

export default Login;