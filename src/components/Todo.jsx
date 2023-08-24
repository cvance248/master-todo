import React, { useState } from 'react';
import { AiOutlineEllipsis, AiFillCheckCircle } from 'react-icons/ai';
import { BiSolidCircle } from 'react-icons/bi';
import '..components/Todo.css';

const TodoItem = ({ title, user, completed, id, onToggleComplete, onEdit, onDelete, onData }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [dataToEdit, setDataToEdit] = useState('');

  const handleEditData = () => {
    onData(title,id);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <div className="todo-icon">
        {completed ? <AiFillCheckCircle 
          style={{color: '#6BDD8A', fontSize: '3rem', backgroundColor: 'white', borderRadius: '50%', padding: '-1px'}}/> : <BiSolidCircle
          style={{color: '#3B3753', fontSize: '3rem', borderRadius: '50%'}} />}
      </div>
      <div className="todo-details">
        <div className="todo-title">{title}</div>
        <div className="todo-user">User: {user}</div>
      </div>
      <div className="todo-menu">
        <AiOutlineEllipsis onClick={toggleMenu} 
          style={{justifyContent: "right"}}/>
        {showMenu && (
          <div className="menu-dropdown">
            <button onClick={() => {
                toggleMenu();
                onEdit()
              setDataToEdit(title,id);
              handleEditData();
                }}>Edit ToDo</button>
            {completed ? (<button onClick={onToggleComplete}>Mark Incomplete</button>) : (<button onClick={onToggleComplete}>Mark Completed</button>)}
            {completed && (<button onClick={onDelete}>Delete</button>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
