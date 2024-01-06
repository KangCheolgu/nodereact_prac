import logo from './logo.svg';
import './App.css';
import {useState, usestate} from 'react';

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
    <board>
      <h1>{props.body}</h1>
      <h2>{props.title}</h2>
    </board>
  )
}

function article() {
  return (
    <article>
      <h1>게시물 상세보기</h1>
    </article>
  )
}

function App() {
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
    </div>
  );
}



export default App;
