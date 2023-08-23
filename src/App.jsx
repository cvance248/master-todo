import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaEllipsisH } from 'react-icons/fa';
import TodoItem from './components/Todo'

function App() {
  const [display, setDisplay] = useState('open');
  const [toDoList, setToDoList] = useState([]);
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

    function getList() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setToDoList(data.map(item => ({ ...item, completed: false }))));
        console.log(toDoList);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };

    const handleToggleComplete = (id) => {
      // Implement your toggle complete logic here
      setToDoList(toDoList.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
      console.log(toDoList.filter(todo => todo.id === id)[0]);
    };
  
    const handleEdit = () => {
      // Implement your edit logic here
    };
  
    const handleDelete = (id) => {
      // Implement your delete logic here
      setToDoList(toDoList.filter(todo => todo.id !== id))
      console.log(toDoList.filter(todo => todo.id !== id))
    };
 
  useEffect(() => {
    getList();
  },[]);

  return (
    <>
    <div className="fixed">

      <div id='header'>
        <div>
        <h1>ToDo's</h1>
        </div>
        <div>
        <div><FaEllipsisH onClick={toggleMenu} /></div>
        </div>
      </div>

      <div id='tabs'>
        <div onClick={() => setDisplay('open')}>Open</div>
        <div onClick={() => setDisplay('closed')}>Closed</div>
        </div>
    </div>
    <button className="toggle-button" onClick={toggleMenu}>
        Add ToDo
      </button>
      <div className={`menu-container ${showMenu ? 'show' : ''}`}>
        <div className="slide-up-menu">
          <button onClick={toggleMenu} className="close-button">
            <AiOutlineArrowLeft />
          </button>
          <p>Add ToDo</p>
          <div className="inputs">
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          </div>
          <div className="finish">
          <button>Finish</button>
          <button>Quit</button>
          </div>
        </div>
      </div>
    
    <div className="content">
      <div className="search">
        <input className='searchInput' type="text" placeholder="Search Todo's" onChange={e => setSearch(e.target.value)} />
      </div>
      <div className={display === 'open' ? 'open' : 'hide'}>
        {toDoList.filter(item => search.toLowerCase() ? item.title.toLowerCase().includes(search.toLowerCase()) : item).filter(item => item.completed === false).map(todo => 
          (<TodoItem
            key={todo.id}
            title={todo.title}
            user={todo.userId}
            completed={todo.completed}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onEdit={() => handleEdit(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            />)
            )}
        </div>

      <div className={display === 'closed' ? 'closed' : 'hide'}>
        {toDoList.filter(item => search.toLowerCase() ? item.title.toLowerCase().includes(search.toLowerCase()) : item).filter(item => item.completed === true).map(todo => 
          (<TodoItem
            key={todo.id}
            title={todo.title}
            user={todo.userId}
            completed={todo.completed}
            onToggleComplete={() => handleToggleComplete(todo.id)}
            onEdit={() => handleEdit(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            />)
            )}
        </div>
        
            </div>
    </>
  )
}

export default App
