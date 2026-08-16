const API_BASE_URL = "https://localhost:7104/api";

export async function register(username, password) {
    const response = await fetch(`${API_BASE_URL}/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed");
    }
    return response.text();
}

export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
    }
    const data = await response.json();
    return data.token;
}