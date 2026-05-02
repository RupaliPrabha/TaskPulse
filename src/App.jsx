import { useEffect, useState } from "react";
import ProgressTracker from "./Components/ProgressTracker";
import Taskform from "./Components/Taskform";
import TaskList from "./Components/TaskList";
import ActivityFeed from "./Components/ActivityFeed";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  const [focusMode, setFocusMode] = useState(false);
  const [deletedTask, setDeletedTask] = useState(null);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save activities to localStorage
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Handle deleted task timeout
  useEffect(() => {
    if (deletedTask) {
      const timer = setTimeout(() => {
        setDeletedTask(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deletedTask]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setActivities((prev) => [`➕ Added: ${task.text}`, ...prev]);
  };

  const updateTask = (updatedTask, index) => {
    const newTask = [...tasks];
    newTask[index] = updatedTask;
    setTasks(newTask);
    setActivities((prev) => [
      updatedTask.completed
        ? `✅ Completed: ${updatedTask.text}`
        : `⚠️ Not Completed: ${updatedTask.text}`,
      ...prev,
    ]);
  };

  const getSuggestion = () => {
    const total = tasks.length;
    const pending = tasks.filter((t) => !t.completed).length;
    if (total === 0) return "🚀 Start by adding your first task!";
    if (pending === 0) return "🎉🥳 All tasks completed!";
    if (pending > 5) return "⚠️ You have too many pending tasks!";
    return "💡 Try completing high priority tasks first.";
  };

  const streak = tasks.filter((t) => t.completed).length;

  const deleteTask = (index) => {
    setDeletedTask(tasks[index]);
    setTasks(tasks.filter((_, idx) => idx != index));
    setActivities((prev) => [`❌ Deleted task: ${tasks[index].text}`, ...prev]);
  };

  const clearTasks = () => {
    setTasks([]);
    setActivities([]);
    localStorage.removeItem("tasks");
    localStorage.removeItem("activities");
  };
  return (
    <div className="app-container">
      <h1 className="title">
        <span className="pulse-dot"></span> TaskPulse
      </h1>
      <p className="tagline">Your Work, In Real Time...</p>
      <p className="streak">🔥 Streak: {streak}</p>
      <div className="dashboard">
        <Taskform addTask={addTask} />
        <button onClick={() => setFocusMode(!focusMode)}>
          {focusMode ? "Exit Focus Mode" : "Focus Mode"}
        </button>

        {deletedTask && (
          <button
            className="undo-btn"
            onClick={() => {
              setTasks([...tasks, deletedTask]);
              setActivities((prev) => [
                `♻️ Restored task: ${deletedTask.text}`,
                ...prev,
              ]);
              setDeletedTask(null);
            }}
          >
            Restored Deleted task : "{deletedTask.text}" from here...
          </button>
        )}

        <p className="suggestion">{getSuggestion()}</p>

        <TaskList
          tasks={focusMode ? tasks.filter((t) => t.priority === "high") : tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />

        <ActivityFeed activities={activities} />

        <ProgressTracker tasks={tasks} />

        {tasks.length > 0 && (
          <button onClick={clearTasks} className="clear-btn">
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
