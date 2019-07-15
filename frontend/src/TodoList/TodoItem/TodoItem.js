import React from 'react';

function Todo({ item = {}, completeTodo }) {
  return (
    <div className="Item" onClick={() => { completeTodo(item) }}>
      <input
        checked={item.Completed}
        readOnly
        type="checkbox" />
      <span className={`Text ${item.Completed && 'Completed'}`}>{item.Text}</span>
    </div>
  );
};

export default Todo;
