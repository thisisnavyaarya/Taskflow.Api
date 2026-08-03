import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";

function App() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTasks()
            .then(setTasks)
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>TaskFlow Live</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.isCompleted ? "Done" : "Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;