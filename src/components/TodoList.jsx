import { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Doctor Appointment", completed: true },
    { id: 2, text: "Meeting at School", completed: false }
  ]);

  const [text, setText] = useState("");

  function addTask() {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setText("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <div className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a task..."
      />

      <button onClick={addTask}>Add</button>
    </div>
  );
}

export default TodoList;
