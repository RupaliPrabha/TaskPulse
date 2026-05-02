export default function TaskList({ tasks, updateTask, deleteTask }) {
  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask, index);
  };
  return (
    <div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <div>
              <span>{task.text}</span>
              <small className={`tag ${task.priority}`}>{task.priority}</small>
              <small> {task.category}</small>
            </div>

            <div>
              <button onClick={() => toggleComplete(index)}>
                {task.completed ? "Undo" : "Completed"}
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
