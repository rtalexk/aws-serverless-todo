import React, { useState } from 'react';
import './TodoNew.css';

const TodoNew = ({ addTodo }) => {
  const [todo, setTodo] = useState('');

  const updateTodo = ({ target: { value } }) => {
    setTodo(value);
  }

  const handleClick = () => {
    addTodo(todo);
    setTodo('');
  };

  return (
    <div className="TodoNew">
      <div className="Text">
        <input
          value={todo}
          onChange={updateTodo}
          type="text" />
      </div>
      <button
        disabled={!todo}
        onClick={handleClick}
        className="Submit">Add</button>
    </div>
  );
};

export default TodoNew;
