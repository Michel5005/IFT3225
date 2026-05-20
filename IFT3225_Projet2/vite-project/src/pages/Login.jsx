import { useState } from "react";
import { api } from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        api("/connexion", "POST", { email, password })
            .then((data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("isAdmin", data.isAdmin);

                window.location.href = "/dashboard";
            })
            .catch((err) => setError(err.message || "Identifiants incorrects"));
    };

    return (
        <div className="login-container">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} />

                <input type={showPassword ? "text" : "password"} placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />

                <label className="checkbox-container">
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                    Afficher le mot de passe
                </label>

                <button type="Submit">Se Connecter</button>
            </form>

            {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

            <p style={{ marginTop: "10px" }}> Pas de compte ?
                <a href="/signup" style={{ color: "white", marginLeft: "5px" }}>
                    Créer un compte
                </a>
            </p>
        </div>
    );
}