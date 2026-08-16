import { useState } from "react";
import { login, register } from "../services/authService";
import { useAuth } from "../context/useAuth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const { loginUser } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (isRegistering) {
            register(username, password)
                .then(() => {
                    setIsRegistering(false);
                    setError("Registration successful. Please log in.");
                })
                .catch((err) => setError(err.message));
        } else {
            login(username, password)
                .then((token) => {
                    loginUser(token);
                })
                .catch((err) => setError(err.message));
        }
    }

    return (
        <div className="app-container">
            <h1>TaskFlow Live</h1>
            <h2>{isRegistering ? "Register" : "Login"}</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isRegistering ? "Register" : "Login"}</button>
            </form>

            <p>
                {isRegistering ? "Already have an account? " : "Need an account? "}
                <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Login" : "Register"}
                </button>
            </p>
        </div>
    );
}

export default Login;