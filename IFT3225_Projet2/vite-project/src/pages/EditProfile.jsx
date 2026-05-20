import { useEffect, useState } from "react";
import { api } from "../api";

export default function EditProfile() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const [showPassword, setShowPassword] = useState(false);
    const [idEdit, setIdEdit] = useState(userId);

    const loadUser = () => {
        api(`/${idEdit}`, "GET")
            .then((data) => {
                setUser(data);
                setMessage("");
            })
            .catch(() => setMessage("Utilisateur non trouvé"));
    };

    useEffect(() => {
        loadUser();
    }, [idEdit]);

    const verifyEmail = async (email) => {
        const response = await fetch(`https://api.zeruh.com/v1/verify?api_key=e543b66b4f43c04c16ae18d58f1e34571cc66fdc859391e239e848f82b9d2bd8&email_address=${email}`);

        const data = await response.json();

        return data.result?.status === "deliverable";
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const valid = await verifyEmail(user.email);

        if (!valid) {
            setMessage("Email invalide ou non existant");
            return;
        }

        api(`/${idEdit}`, "PUT", user)
            .then(() => setMessage("Profil mis à jour !"))
            .catch(() => setMessage("Erreur pendant la mise à jour"));
    };

    const generatePassword = () => {
        const longueur = prompt("Quelle est la longueur du mot de passe que vous voulez générer ?");

        if (!longueur) {
            return;
        }

        fetch(`http://localhost:3000/profils/motdepasse/${longueur}`)
            .then(res => res.json())
            .then(data => {
                setUser({ ...user, password: data.motdepasse });
            })
            .catch(() => alert("Erreur de génération de mot de passe"));
    };

    if (!user)
        return <p>Chargement...</p>;

    return (
        <div className="edit-container">
            <h1>Modifier profil</h1>

            <form onSubmit={handleUpdate}>
                <p><strong>ID :</strong> {user._id}</p>

                <input type="text" placeholder="Nouveau pseudonyme" value={user.pseudo} onChange={(e) => setUser({ ...user, pseudo: e.target.value })} />

                <input type="text" placeholder="Nouvelle adresse courriel" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

                <input type={showPassword ? "text" : "password"} placeholder="Nouveau mot de passe" value={user.password || ""} onChange={(e) => setUser({ ...user, password: e.target.value })} />

                <label className="checkbox-container">
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                    Afficher le mot de passe
                </label>

                <button type="button" onClick={generatePassword}>
                    Générer un mot de passe
                </button>

                {isAdmin && (
                    <label className="checkbox-container">
                        <input type="checkbox" checked={user.isAdmin} onChange={(e) => setUser({ ...user, isAdmin: e.target.checked })} />
                        Admin?
                    </label>
                )}

                <button type="submit"> Mettre à jour </button>

            </form>

            {message && <p>{message}</p>}

            <button className="back-btn" onClick={() => (window.location.href = "/dashboard")} style={{ marginTop: "10px" }}>
                Retour au dashboard
            </button>

        </div>
    )
}
