import { useEffect } from "react";
import { useState } from "react";

export default function Taskform({ addTask }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [toast, setToast] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      setToast("❌ Please enter a task");
      return;
    }
    addTask({ text: task, priority, category, completed: false });
    setToast("✅ Task added successfully");

    //Reset
    setTask("");
    setPriority("medium");
    setCategory("general");
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [toast]);
  return (
    <div>
      {toast && <div className="toast">{toast}</div>}
      <form className="task-form" onSubmit={handleSubmit}>
        <div id="inp">
          <input
            type="text"
            placeholder="Enter the Task"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <button type="submit">Add Task</button>
        </div>

        <div>
          <select
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
        </div>
      </form>
    </div>
  );
}
