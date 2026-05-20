import { useEffect, useState } from "react";
import { api } from "../api";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(null);
    const [searchId, setSearchId] = useState("");

    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const loadAllUsers = () => {
        if (!isAdmin)
            return alert("Accès refusé - reservé aux admins.");
        api("/")
            .then(data => setUsers(data))
            .catch(() => alert("Erreur"))
    };

    const loadUser = () => {

        if (!searchId.trim()) {
            alert("Veuillez entrer l'ID d'un utilisateur. ");
            return;
        }

        api(`/${searchId}`, "GET")
            .then(data => setUsers([data]))
            .catch(() => alert("Utilisateur non trouvée"));
    };

    const startEdit = (user) => {
        setEdit({ ...user });
    };

    const verifyEmail = async (email) => {
        const response = await fetch(`https://api.zeruh.com/v1/verify?api_key=e543b66b4f43c04c16ae18d58f1e34571cc66fdc859391e239e848f82b9d2bd8&email_address=${email}`);

        const data = await response.json();

        return data.result?.status === "deliverable";
    };

    const saveEdit = async () => {

        const valid = await verifyEmail(edit.email);

        if (!valid) {
            alert("Email invalide ou non existant");
            return;
        }

        api(`/${edit._id}`, "PUT", edit)
            .then(() => {
                setUsers(users.map(u => u._id === edit._id ? edit : u));
                setEdit(null);
            })
            .catch(() => alert("Erreur lors de la modification"));
    };

    if (!isAdmin) {
        return (
            <div className="access-deny">
                <p style={{ color: "red", marginTop: "15px" }}>Accès refusé - Réservé aux admins.</p>
                <button className="back-btn" onClick={() => (window.location.href = "/dashboard")} style={{ marginTop: "10px" }}>
                    Retour au dashboard
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Liste des utilisateurs</h1>

            <button className="back-btn" onClick={() => (window.location.href = "/dashboard")} style={{ marginTop: "10px" }}>
                Retour au dashboard
            </button>

            <div className="user-delete-container">
                <button className="user-delete-btn" onClick={() => (window.location.href = "/admin/delete")}>
                    Supprimer un utilisateur
                </button>
            </div>

            <h2 style={{ marginTop: "15px" }}>Afficher un utilisateur</h2>
            <input type="text" placeholder="ID user" value={searchId} onChange={(e) => setSearchId(e.target.value)} />

            <button style={{ marginLeft: "5px" }} onClick={loadUser}>Rechercher</button>



            <h2 style={{ marginTop: "15px" }}>Afficher tous les utilisateurs</h2>
            <div className="database">
                <button className="database-btn" onClick={loadAllUsers}>Charger la database</button>
            </div>

            <div className="users">
                <table className="users-table" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td>{u._id}</td>
                                <td>{u.pseudo}</td>
                                <td>{u.email}</td>
                                <td>{u.isAdmin ? "Admin" : "User"}</td>
                                <td>
                                    <button onClick={() => startEdit(u)}>Modifier</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {edit && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Modifier l'utilisateur</h2>

                    <input type="text" value={edit.pseudo} onChange={(e) => setEdit({ ...edit, pseudo: e.target.value })} />

                    <input type="text" value={edit.email} onChange={(e) => setEdit({ ...edit, email: e.target.value })} />

                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setEdit(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}