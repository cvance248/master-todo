import React, { useState } from 'react';
import { RiCheckboxCircleLine, RiCheckboxBlankLine } from 'react-icons/ri';
import { AiOutlineEllipsis } from 'react-icons/ai';
import './TodoItem.css'; // Create this CSS file to style the component

const TodoItem = ({ title, user, completed, onToggleComplete, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <div className="todo-icon" onClick={onToggleComplete}>
        {completed ? <RiCheckboxCircleLine /> : <RiCheckboxBlankLine />}
      </div>
      <div className="todo-details">
        <div className="todo-title">{title}</div>
        <div className="todo-user">User: {user}</div>
      </div>
      <div className="todo-menu">
        <AiOutlineEllipsis onClick={toggleMenu} />
        {showMenu && (
          <div className="menu-dropdown">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
