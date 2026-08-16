import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./services/taskService";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import Login from "./components/Login";
import "./App.css";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { logoutUser } = useAuth();

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
        <div className="app-container">
            <h1>TaskFlow Live</h1>
            <button onClick={logoutUser}>Logout</button>

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
                            className="task-text"
                            style={{
                                textDecoration: task.isCompleted ? "line-through" : "none",
                                color: task.isCompleted ? "#999" : "#333",
                            }}
                        >
                            {task.title} - {task.description}
                        </span>
                        <button className="btn-complete" onClick={() => handleToggleComplete(task)}>
                            {task.isCompleted ? "Mark Pending" : "Mark Done"}
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function AppContent() {
    const { token } = useAuth();
    return token ? <TaskList /> : <Login />;
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;