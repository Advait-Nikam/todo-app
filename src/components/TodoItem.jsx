import React, { useState, useRef, useEffect } from "react";

function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editRef = useRef(null);

  // when switching to edit mode focus the input
  useEffect(() => {
    if (isEditing) {
      setEditText(task.text); // sync current text in case it changed
      editRef.current?.focus();
    }
  }, [isEditing, task.text]);

  function startEdit() {
    setIsEditing(true);
  }

  function saveEdit(e) {
    e.preventDefault();
    editTask(task.id, editText);
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditText(task.text);
  }

  return (
    <div className={`todo-item ${task.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleted(task.id)}
        aria-label={`Mark ${task.text} completed`}
      />

      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit} style={{ flex: 1 }}>
          <input
            ref={editRef}
            className="edit-input"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Escape") {
                cancelEdit();
              }
            }}
          />
          <button className="btn small save" type="submit">Save</button>
          <button type="button" className="btn small" onClick={cancelEdit}>Cancel</button>
        </form>
      ) : (
        <>
          <p className="text" title={task.text}>{task.text}</p>

          <button className="btn small" onClick={startEdit}>Edit</button>
          <button className="btn small danger" onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TodoItem;
