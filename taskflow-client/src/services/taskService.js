const API_BASE_URL = "https://localhost:7104/api";

export async function getTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Failed to create task");
    }
    return response.json();
}

export async function updateTask(id, task) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Failed to update task");
    }
}

export async function deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}