import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./services/taskService";

function App() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        loadTasks();
    }, []);

    function loadTasks() {
        getTasks()
            .then(setTasks)
            .catch((err) => setError(err.message));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;

        createTask({ title, description, isCompleted: false })
            .then(() => {
                setTitle("");
                setDescription("");
                loadTasks();
            })
            .catch((err) => setError(err.message));
    }

    function handleToggleComplete(task) {
        updateTask(task.id, {
            title: task.title,
            description: task.description,
            isCompleted: !task.isCompleted,
        })
            .then(loadTasks)
            .catch((err) => setError(err.message));
    }

    function handleDelete(id) {
        deleteTask(id)
            .then(loadTasks)
            .catch((err) => setError(err.message));
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>TaskFlow Live</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{
                                textDecoration: task.isCompleted ? "line-through" : "none",
                            }}
                        >
                            {task.title} - {task.description}
                        </span>
                        <button onClick={() => handleToggleComplete(task)}>
                            {task.isCompleted ? "Mark Pending" : "Mark Done"}
                        </button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;