import React, { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";
import "../App.css";

function TodoList() {
  // load saved tasks or fallback to sample tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem("simple_todos_v1");
      return raw ? JSON.parse(raw) : [
        { id: 1, text: "Doctor Appointment", completed: true },
        { id: 2, text: "Meeting at School", completed: false }
      ];
    } catch {
      return [];
    }
  });

  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // persist tasks
  useEffect(() => {
    localStorage.setItem("simple_todos_v1", JSON.stringify(tasks));
  }, [tasks]);

  const makeId = () => Date.now() + Math.floor(Math.random() * 1000);

  // Add task (keeps input from causing page reload)
  function addTask(e) {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = { id: makeId(), text: trimmed, completed: false };
    setTasks(prev => [newTask, ...prev]); // newest on top
    setText("");
    inputRef.current?.focus();
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  // NEW: editTask — update or delete when saved empty
  function editTask(id, newText) {
    const trimmed = newText.trim();
    if (!trimmed) {
      // if empty after edit, delete the task
      setTasks(prev => prev.filter(t => t.id !== id));
      return;
    }
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)));
  }

  return (
    <div className="todo-container">
      {/* keep page heading outside container (App.js has the main heading) */}

      <form className="add-section" onSubmit={addTask}>
        <input
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task..."
          className="input"
          aria-label="Add a new todo"
        />
        <button className="btn add-btn">Add</button>
      </form>

      {/* list-box is scrollable so adding items does not push the input down */}
      <div className="list-box">
        {tasks.length === 0 ? (
          <p className="empty">No tasks yet — add one above</p>
        ) : (
          tasks.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              editTask={editTask}            // <-- pass editTask to item
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
