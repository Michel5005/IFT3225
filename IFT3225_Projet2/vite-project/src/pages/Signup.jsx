import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const verifyEmail = async (email) => {
        const response = await fetch(`https://api.zeruh.com/v1/verify?api_key=e543b66b4f43c04c16ae18d58f1e34571cc66fdc859391e239e848f82b9d2bd8&email_address=${email}`);

        const data = await response.json();

        return data.result?.status === "deliverable";
    };


    const handleSignup = async (e) => {
        e.preventDefault();

        const emailValid = await verifyEmail(email);

        if (!emailValid) {
            setMessage("Adresse Courriel invalide !");
            return;
        }

        api("/", "POST", { pseudo, email, password, isAdmin })
            .then(() => {
                setMessage("Compte créé !");
                setTimeout(() => navigate("/login"), 1000);
            })
            .catch((err) => { 
                const message = err?.message || "Erreur lors de la création du compte !"

                setMessage(message);
            });
    };



    const generatePassword = () => {
        const longueur = prompt("Quelle est la longueur du mot de passe que vous voulez générer ?");

        if (!longueur) {
            return;
        }

        fetch(`http://localhost:3000/profils/motdepasse/${longueur}`)
            .then(res => res.json())
            .then(data => setPassword(data.motdepasse))
            .catch(() => alert("Erreur de génération de mot de passe"));
    };

    return (
        <div className="signup-container">
            <h1>Créer un compte</h1>

            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Pseudonyme"
                    onChange={(e) => setPseudo(e.target.value)} />

                <input type="email" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} />

                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <label className="checkbox-container">
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                    Afficher le mot de passe
                </label>

                <button type="button" onClick={generatePassword}>
                    Générer un mot de passe
                </button>

                <label className="checkbox-container">
                    <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                    Admin?
                </label>

                <button type="submit">S'inscrire</button>
            </form>

            {message && <p style={{ color: "red", marginTop: "15px" }}>{message}</p>}

            <p style={{ marginTop: "10px" }}> Déjà un compte ?
                <a href="/login" style={{ color: "white", marginLeft: "5px" }}>
                    Login
                </a>
            </p>
        </div>
    )
}