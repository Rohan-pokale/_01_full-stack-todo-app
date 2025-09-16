import React, { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/tasks";

  // 🔹 Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  // 🔹 Add or Update task
  const saveTask = () => {
    if (!task.trim()) return;

    if (editId) {
      // Update existing task
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: task }),
      })
        .then(() => {
          setTask("");
          setEditId(null);
          fetchTasks();
          toast.info("✏ Task updated!");
        })
        .catch((err) => console.error("Error updating task:", err));
    } else {
      // Add new task
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: task }),
      })
        .then(() => {
          setTask("");
          fetchTasks();
          toast.success("Task added successfully!");
        })
        .catch((err) => console.error("Error adding task:", err));
    }
  };

  // 🔹 Edit task
  const editTask = (taskObj) => {
    setTask(taskObj.name);
    setEditId(taskObj.id);
  };

  // 🔹 Delete task
  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchTasks();
        toast.warn("🗑 Task deleted!");
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <>
      <div className="app">
        <h1 className="title">TaskFlow – Stay Organized 🚀</h1>

        <div className="input-container">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
          />
          <button onClick={saveTask}>{editId ? "Update" : "Add"}</button>
        </div>

        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t.id} className="task-item">
              <span>{t.name}</span>
              <div className="actions">
                <button onClick={() => editTask(t)}>✏</button>
                <button onClick={() => deleteTask(t.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Keep ToastContainer OUTSIDE the scrollable app container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
