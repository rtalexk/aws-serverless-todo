import React, { useContext, useState, useEffect } from 'react';
import './TodoList.css';

import Config from '../config';
import AuthContext from '../context/Auth';
import * as Cognito from '../lib/cognito';

import TodoItem from './TodoItem';
import TodoNew from './TodoNew';

function TodoList({ history }) {
  const Auth = useContext(AuthContext);

  const gotoLoginPage = () => {
    history.replace('/login');
  }

  if (!Auth.user) {
    gotoLoginPage();
  }

  const buildHeaders = (token) => ({ Authorization: token, 'Content-Type': 'application/json' });

  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchTodos() {
      const token = await Cognito.getToken();

      if (!token) { return; }

      const response = await fetch(`${Config.api.invokeUrl}/todos`, {
        method: 'GET',
        headers: buildHeaders(token),
      }).then(res => res.json());
      if (response.Error) {
        setError(response.Error);
      } else {
        setTodos(response.todos)
      }
    })()
  }, []);

  const handleSignout = () => {
    Auth.logout(history);
    gotoLoginPage();
  }

  const completeTodo = async (todo) => {
    const newTodo = {
      ...todo,
      Completed: !todo.Completed,
    };

    const token = await Cognito.getToken();

    const response = await fetch(`${Config.api.invokeUrl}/todos`, {
      method: 'PUT',
      headers: buildHeaders(token),
      body: JSON.stringify(newTodo),
    }).then(res => res.json())

    const { todo: toggled } = response;
    const oldIndex = todos.findIndex(t => t.Id === todo.Id);
    const newTodos = [...todos.slice(0, oldIndex), toggled, ...todos.slice(oldIndex + 1)];

    setTodos(newTodos);
  }

  const addTodo = async (Todo) => {
    const token = await Cognito.getToken();
    const response = await fetch(`${Config.api.invokeUrl}/todos`, {
      method: 'POST',
      headers: buildHeaders(token),
      body: JSON.stringify({ Todo }),
    }).then(res => res.json())

    const { todo } = response;
    const newTodos = [...todos, todo];

    setTodos(newTodos);
  }

  return (
    <div className="TodoList">
      <button className="Logout" onClick={handleSignout}>Log out</button>
      <TodoNew addTodo={addTodo} />
      {error && (
        <div className="Error">{error}</div>
      )}
      <div className="List">
        {todos.map(todo => (
          <TodoItem
            item={todo}
            key={todo.Id}
            completeTodo={completeTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
