import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AiOutlineArrowLeft, AiFillPlusCircle, AiOutlineSearch } from 'react-icons/ai';
import { FaEllipsisH } from 'react-icons/fa';
import TodoItem from './components/Todo'

function App() {
  const [display, setDisplay] = useState('open');
  const [toDoList, setToDoList] = useState([]);
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState('');
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState(0);
  const [summary, setSummary] = useState('');
  const [dataFromChild, setDataFromChild] = useState('');

  const handleDataFromChild = (title,id) => {

    setTitle(title);
    setId(id);

  };

  

  const toggleMenu = () => {
    const body = document.body;
    setShowMenu(!showMenu);
    body.classList.toggle('scroll-lock');
  };

  const addTodo = () => {

    const maxId = toDoList.sort((a, b) => b.id - a.id)[0].id
    const newTodo = [{ userId: +user, id: maxId + 1, title, body:summary, completed:status === 'true' ? true : false }];
    localStorage.setItem('toDoList', JSON.stringify(toDoList.concat(newTodo)));
    setToDoList(JSON.parse(localStorage.getItem('toDoList')).sort((a, b) => a.id - b.id));

    toggleMenu();
  };

  const editTodo = () => {

    localStorage.setItem('toDoList', JSON.stringify(toDoList.map(todo => todo.id === id ? { ...todo, title, body:summary, completed:status === 'true' ? true : false } : todo)));
    setToDoList(JSON.parse(localStorage.getItem('toDoList')).sort((a, b) => a.id - b.id));
    handleEdit();
  }

    function getList() {

      localStorage.getItem('toDoList') ? setToDoList(JSON.parse(localStorage.getItem('toDoList')).sort((a, b) => a.id - b.id)) :

      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {setToDoList(data.map(item => ({ ...item, completed: false })))
        localStorage.setItem('toDoList', JSON.stringify(data.map(item => ({ ...item, completed: false }))));
      });

    }

    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };

    const handleToggleComplete = (id) => {
      // Implement your toggle complete logic here
      localStorage.setItem('toDoList', JSON.stringify(toDoList.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
      setToDoList(JSON.parse(localStorage.getItem('toDoList')).sort((a, b) => a.id - b.id));

    };
  
    const handleEdit = () => {
      // Implement your edit logic here
      setShowEdit(!showEdit);
    };
  
    const handleDelete = (id) => {
      // Implement your delete logic here
      localStorage.setItem('toDoList', JSON.stringify(toDoList.filter(todo => todo.id !== id)))
      setToDoList(JSON.parse(localStorage.getItem('toDoList')).sort((a, b) => a.id - b.id));

    };
 
  useEffect(() => {
    getList();
  },[]);

  return (
    <>
    <div className='fixed'>

      <div id='header'>
        <div>
        <h1>ToDo's</h1>
        </div>
        <div>
        <div><FaEllipsisH onClick={toggleMenu} /></div>
        </div>
      </div>

      <div id='tabs'>
        <div className={display === 'closed' ? '' : 'active'} onClick={() => setDisplay('open')}>Open</div>
        <div className={display === 'open' ? '' : 'active'} onClick={() => setDisplay('closed')}>Closed</div>
        </div>
    </div>
    <button className="toggle-button" onClick={toggleMenu}>
    <AiFillPlusCircle 
      style={{color: 'white', fontSize: '3rem', borderRadius: '50%', backgroundColor: '#292639'}}/>
      </button>
      <div className={`menu-container ${showMenu ? 'show' : ''}`}>
        <div className="slide-up-menu">
          <div className="menu-header">
          <button onClick={toggleMenu} className="close-button">
            <AiOutlineArrowLeft />
          </button>
          <p>Add ToDo</p>
          <div></div>
          </div>
          <div className="inputs">
          <input type="text" name="title" id="" placeholder='Title' onChange={e => setTitle(e.target.value)}/>
          <input type="text" name="body" id="" placeholder='Description' onChange={e => setSummary(e.target.value)}/>
          <select name="user" id="" onChange={e => setUser(e.target.value)}>
            <option value="">User</option>
            {[...new Set(toDoList.map(todo => todo.userId))].map(todo => (
              <option value={todo}>{todo}</option>
            ))}
          </select>
          <select name="status" id="" onChange={e => setStatus(e.target.value)}>
            <option value="">Status</option>
            <option value={false}>Incomplete</option>
            <option value={true}>Complete</option>
          </select>
          </div>
          <div className="finish">
          <button onClick={() => addTodo()}>Finish</button>
          <button onClick={toggleMenu}>Quit</button>
          </div>
        </div>
      </div>
      <div className={`menu-container ${showEdit ? 'show' : ''}`}>
        <div className="slide-up-menu">
          <div className="menu-header">
          <button onClick={() => handleEdit()} className="close-button">
            <AiOutlineArrowLeft />
          </button>
          <p>Edit ToDo</p>
          <div></div>
          </div>
          <div className="inputs">
          <input value={title} type="text" name="title" id="" placeholder='Title' onChange={e => setTitle(e.target.value)}/>
          <input value={summary} type="text" name="body" id="" placeholder='Description' onChange={e => setSummary(e.target.value)}/>
          <select name="user" id="" onChange={e => setUser(e.target.value)}>
            <option value={user}>User</option>
            {[...new Set(toDoList.map(todo => todo.userId))].map(todo => (
              <option value={todo}>{todo}</option>
            ))}
          </select>
          <select name="status" id="" onChange={e => setStatus(e.target.value)}>
            <option value={status}>{!status ? 'Incomplete' : 'Complete'}</option>
            <option value={false}>Incomplete</option>
            <option value={true}>Complete</option>
          </select>
          </div>
          <div className="finish">
          <button onClick={() => editTodo(id)}>Finish</button>
          <button onClick={() => handleEdit()}>Quit</button>
          </div>
        </div>
      </div>
    
    <div className="content">
      <div className="search">
        <input className='searchInput' type="text" placeholder="Search Todo's" onChange={e => setSearch(e.target.value)} />
        <div className="search-button">
        <AiOutlineSearch
          style={{fontSize: '2rem'}} />
        </div>
      </div>
      <div className={display === 'open' ? 'open' : 'hide'}>
        {toDoList.filter(item => search.toLowerCase() ? item.title.toLowerCase().includes(search.toLowerCase()) : item).filter(item => item.completed === false).map(todo => 
          (<TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            user={todo.userId}
            completed={todo.completed}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onEdit={() => handleEdit(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            onData={handleDataFromChild}
            />)
            )}
        </div>

      <div className={display === 'closed' ? 'closed' : 'hide'}>
        {toDoList.filter(item => search.toLowerCase() ? item.title.toLowerCase().includes(search.toLowerCase()) : item).filter(item => item.completed === true).map(todo => 
          (<TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            user={todo.userId}
            completed={todo.completed}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onEdit={() => handleEdit(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            onData={handleDataFromChild}
            />)
            )}
        </div>
        
            </div>
    </>
  )
}

export default App
