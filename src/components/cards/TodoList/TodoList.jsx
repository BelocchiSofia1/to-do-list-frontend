import React, { useState, useEffect } from 'react';
import Card from '../Card.jsx/Card';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const URLTask = 'http://localhost:3000/api/task';

  useEffect(() => {
    fetch(URLTask)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  //trim elimina espacios en blanco
  const addTask = () => {
    if (newTaskTitle.trim() === '' || newTaskDescription.trim().length < 5) return;

    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'PENDING'
    };

    fetch(URLTask, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(text => { throw new Error(JSON.stringify(text)) });
        }
        return response.json();
      })
      .then(data => {
        setTasks([...tasks, data]);
        setNewTaskTitle('');
        setNewTaskDescription('');
      })
      .catch(error => console.error('Error adding task:', error.message));
  };

  const deleteTask = id => {
    fetch(`${URLTask}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="container mt-4 bg-light p-4 rounded">
      <h1 className="mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Description"
          value={newTaskDescription}
          onChange={e => setNewTaskDescription(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="row">
        {tasks.map(task => (
          <div className="col-md-4 mb-3" key={task.id}>
            <Card
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onDelete={deleteTask} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;