import { useEffect } from "react";
import axios from "axios";
import './App.css';
import {useState} from 'react';
import cookie from 'react-cookies';

const isLogin = cookie.load('userid');

function Header(props) {
  return (
    <header>
      <h1><a href="/" onClick={(event) => {
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Sidebar(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id = {t.id} href={'/board/'+t.id} onClick={(event) => {
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a>
    </li>);
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Create(props) {
  return (
    <div>
      <h2> 글생성 </h2>
      <form onSubmit={event=> {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.contents.value;
        props.onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="제목" /> </p>
        <p><textarea type="text" name="contents" placeholder="내용을 입력해주십시오" /></p>
        <p><input type="submit" value="create"></input></p>
      </form>
    </div>
  )
}

function Update(props) {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);
    return (
        <div>
          <h2> 글수정 </h2>
          <form onSubmit={event=> {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.contents.value;
            props.onUpdate(title, body);
          }}>
            <p><input type="text" name="title" value={title} onChange={event=>{
                setTitle(event.target.value);
            }}/></p>
            <p><textarea type="text" name="contents" value={body} onChange={event=>{
                setBody(event.target.value);
            }}/></p>
            <p><input type="submit" value="Update"></input></p>
          </form>
        </div>
      )
}

function Body(props) {
  return (
    <div>
      <h1>{props.body}</h1>
      <h2>{props.title}</h2>
    </div>
  )
}

function article() {
  return (
    <article>
      <h1>게시물 상세보기</h1>
    </article>
  )
}


function Login(props) {
    return (
      <form action="/login" method="POST">
        <p>아이디<br/><input type="text" id="userid_login"></input></p>
        <p>패스워드<br/><input  type="text" id="userpwd_login"></input></p>
        <button value="Login" onClick={(event) => {
        event.preventDefault();
        props.onLogin();
      }}>로그인</button>&nbsp;&nbsp;<button>회원가입</button>
      </form>
    )
}

function App() {
    ////////////////////////////////////////////////////////////////
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mode, setMode] = useState('HOME');
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics, setTopics] = useState([
        {id:1, title:'공지사항', body:'공지사항 게시판'},
        {id:2, title:'핫게시판', body:'핫 게시판'},
        {id:3, title:'자유게시판', body:'자유 게시판'}
    ]);

    let content = null;
    let contextControl = null;

    if(mode === 'HOME') {
        content = <Body title="HOME" body="welcome HOME"></Body>
    } else if(mode === 'BOARD') {
        let title, body = null;
        for (let i = 0; i<topics.length; i++) {
        if(topics[i].id === id) {
            title = topics[i].title;
            body = topics[i].body;
            break;
        }
    }
    content = <Body title={title} body={body}></Body>
    contextControl = <> 
    <li><a href={'/update/'+ id} onClick={event=>{
        event.preventDefault();
        setMode('UPDATE')
    } }>Update</a></li>
    <li><a href={'/delete/'+ id} onClick={event=>{
        event.preventDefault();
        const newTopics = [];
        for(let i = 0; i < topics.length; i++) {
            if(topics[i].id !== id) {
                newTopics.push(topics[i]);
            }
        }
        setTopics(newTopics);
    } }>Delete</a></li>
    </>

    } else if(mode === 'CREATE') {
        content = <Create onCreate={(_title, _body) => {
        const newTopic = {id:nextId, title:_title, body:_body};
        const newTopics = [...topics];
        newTopics.push(newTopic);
        setTopics(newTopics);
    }}></Create>
    } else if(mode === 'UPDATE') {
        let title, body = null;
        for (let i = 0; i<topics.length; i++) {
        if(topics[i].id === id) {
            title = topics[i].title;
            body = topics[i].body;
            break;
        }
    }
    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
        const updatedTopic = {id:nextId, title:_title, body:_body};
        const newTopics = [...topics];  
        for(let i = 0; i<newTopics.length; i++) {
            if(newTopics[i].id === id) {
                newTopics[i] = updatedTopic;
                break;
            }
        }
        setTopics(newTopics);
        }}></Update> 
    } 
    //////////////////////////////////////////////////////////////// 로그인 관련
    function IsLogin(props){
        // 로그인을 하면 쿠키에 로그인 유무를 저장하고 그것을 가져와서
        // 유저 로그인 유무를 판단하여 로그인 중이면 <Logining>, 로그인 중이 아니면 <Login>
        // 이 나오게 한다.
        const userDataCookie = cookie.load('isLoggedIn');
    
        const user_login = async () => {
            const user_id = document.getElementById('userid_login').value;
            const user_pwd = document.getElementById('userpwd_login').value;
        
            axios.post('/api/login', {
                user_id: user_id,
                user_pwd: user_pwd
              })
              .then(function (response) {
                let res = response.data;
                console.log(res);
                if(res === 'success') {
                    alert("로그인 성공");
                    props.onLogin(user_id);
                    
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
    
        const Logining = () => {
            return (
                <div>
                    환영합니다! <br></br>
                    <button onClick={props.onLogout()}>로그아웃</button>
                    <button>정보수정</button>      
                </div>
            )
        }
        
        if(isLoggedIn === false) {
            return (
            <div>
                <Login onLogin={() => {
                    user_login();
                }}></Login>
            </div>
            );
        } else {
            return (
            <Logining onLogout={()=>{
                props.onLogout();
            }}>
            </Logining>
            );
        }
    }

    const loginHandler = (_userId) => {
        cookie.save('isLoggedIn', _userId);
        setIsLoggedIn(true);
      };

    const logoutHandler = () => {
        cookie.remove('isLoggedIn');
        setIsLoggedIn(false);
    }
    // 로그인 완료되면 로그인창 없어지고 로그아웃과 회원정보 수정 창이 나오도록

    useEffect(() => {
        const StoredUserLoggedInformation = cookie.load('isLoggedIn');
    
        if (StoredUserLoggedInformation === 'LOGIN') {
          setIsLoggedIn(true);
        }
      }, []);

    ///////////////////////////////////////////////// 화면에 보이는 페이지
    return (
    
    <div>
        <Header title="홈페이지" onChangeMode={() => {
          setMode('HOME');
        }}></Header>
        <Sidebar topics={topics} onChangeMode={(_id) => {
          setMode('BOARD');
          setId(_id);
        }}> </Sidebar>
        {content}
        <ul>
          <li>
            <a href="create" onClick={event=>{
              event.preventDefault();
              setMode('CREATE');
            }}>CREATE</a>
          </li>
          {contextControl}
        </ul>
        
        <IsLogin onLogin={() => (
            loginHandler()
        )} onLogout={() => (
            logoutHandler()
        )} isLogin={isLoggedIn}></IsLogin>
    </div>
    );
}

export default App;