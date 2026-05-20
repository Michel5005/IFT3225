import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin") == "true";

    useEffect(() => {
        api(`/${userId}`)
            .then((data) => setUser(data))
            .catch(() => {
                localStorage.clear();
                window.location.href = "/login";
            });
    }, []);

    if (!user) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="dashboard">
            <h1>Bienvenue, {user.pseudo}</h1>

            <p>Email: {user.email}</p>
            <p>Rôle: {user.isAdmin ? "Admin" : "User"}</p>
            <p>ID: {user._id}</p>

            <button onClick={() => (window.location.href = "/Documentation")} style={{ marginTop: "10px" }}>
                Documentation
            </button>

            <button onClick={() => (window.location.href = "/editprofile")} style={{ marginTop: "10px" }}>
                Modifier mon profil
            </button>

            <hr />

            {isAdmin && (
                <div>
                    <button onClick={() => (window.location.href = "/admin/users")}>
                        Gérer les utilisateurs
                    </button>
                </div>
            )}

            {!isAdmin && (
            <button onClick={() => (window.location.href = "/admin/users")}>
                Gérer les utilisateurs
            </button>
            )}

            <button
                onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }}
            > Déconnexion
            </button>
        </div>
    );
}