const API_BASE_URL = "https://localhost:7104/api";

export async function getTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return response.json();
}