import { useState } from "react";
import { api } from "../api";

export default function DeleteUser() {
    const [id, setId] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");

    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isAdmin) {
        return <h1>Accès refusé : réservé aux admins !</h1>;
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (!id.trim()) {
            alert("Veuillez entrer l'ID d'un utilisateur. ");
            return;
        }

        api(`/${id}`, "GET")
            .then((data) => {
                setUser(data);
                setMessage("");
            })
            .catch(() => {
                setUser(null);
                setMessage("Utilisateur non trouvée");
            });
    };

    const handleDelete = () => {

        if (!user) {
            setMessage("Aucun utilisateur à supprimer. ");
            return;
        }

        if (!window.confirm("Voulez-vous vraiment supprimer l'utilisateur? ")) {
            return;
        }

        api(`/${id}`, "DELETE")
            .then(() => {
                setUser(null);
                setMessage("Utilisateur supprimé !");
            })
            .catch(() => setMessage("Erreur pendant la suppression."));
    };

    return (
        <div className="delete-container">
            <h1>Supprimer un utilisateur</h1>

            <button className="back-btn" onClick={() => (window.location.href = "/dashboard")} >
                Retour au dashboard
            </button>

            <button className="back-btn" onClick={() => (window.location.href = "/admin/users")} >
                Retour à la gestion des utilisateurs
            </button>

            <form style={{ marginTop: "20px" }} onSubmit={handleSearch}>
                <input type="text" placeholder="ID du user" value={id} onChange={(e) => setId(e.target.value)} />

                <button style={{ marginLeft: "5px" }} type="submit">Rechercher</button>
            </form>

            {message && <p style={{ color: "red", marginTop: "15px" }}>{message}</p>}

            {user && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Informations de l'utilisateur</h2>
                    <p><strong>ID :</strong> {user._id}</p>
                    <p><strong>Pseudonyme :</strong>{user.pseudo}</p>
                    <p><strong>Email :</strong>{user.email}</p>
                    <p><strong>Admin :</strong>{user.isAdmin ? "Oui" : "Non"}</p>

                    <button className="delete-btn" onClick={handleDelete}>
                        Supprimer ce profil
                    </button>
                </div>
            )}
        </div>
    )
}