const API_BASE_URL = "https://localhost:7104/api";

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
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
        headers: getAuthHeaders(),
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Failed to update task");
    }
}

export async function deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}