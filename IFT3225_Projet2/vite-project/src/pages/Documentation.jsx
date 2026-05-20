import React from "react";

const routes = [
  {
  id: 0,
  method: "POST",
  path: "/profils/connexion",
  roles: ["admin", "user"],
  description: "Authentifie un utilisateur et retourne un token JWT.",
  curl: `curl -X POST http://localhost:3000/profils/connexion \
-H "Content-Type: application/json" \
-d '{
  "email": "alexandre.therrien1@gmail.com",
  "password": "alex"
}'`,
  response: `{"token": "<token_jwt_valide>"}`,
},
{
    id: 1,
    method: "POST",
    path: "/profils",
    roles: ["admin", "user"],
    description: "Ajoute un nouvel utilisateur.",
    curl: `curl -X POST http://localhost:3000/profils \
-H "Content-Type: application/json" \
-d '{
  "pseudo": "alex", "email": "alex@example.com", "password": "MonPass123", "isAdmin": false}'`,
    response: `{"message": "Profil créé avec succès"}`,
  },
  {
    id: 2,
    method: "DELETE",
    path: "/profils/{id}",
    roles: ["admin"],
    description: "Supprime un utilisateur par son identifiant.",
    curl: `curl -X DELETE http://localhost:3000/profils/<id> \
-H "Authorization: Bearer <token_admin_valide>"`,
    response: `{"message": "Profil supprimé avec succès"}`,
  },
  {
    id: 3,
    method: "GET",
    path: "/profils",
    roles: ["admin"],
    description: "Retourne tous les profils.",
    curl: `curl -X GET http://localhost:3000/profils \
-H "Authorization: Bearer <token_admin_valide>"`,
    response: `[{"_id": "69c2a2706d842427b23722db", "pseudo": "alextest", "email": "alex@alex.com", "isAdmin": false, "__v": 0}]`,
  },
  {
    id: 4,
    method: "GET",
    path: "/profils/{id}",
    roles: ["admin", "user"],
    description: "Retourne un profil par son identifiant.",
    curl: `curl -X GET http://localhost:3000/profils/69c2b5de2acc6497f10f21dd \
-H "Authorization: Bearer <token_jwt_valide>"`,
    response: `{"_id":"69c2b5de2acc6497f10f21dd","pseudo":"alex","email":"alexandre.therrien1@gmail.com","isAdmin":true,"__v":0}`,
  },
  {
    id: 5,
    method: "PUT",
    path: "/profils/{id}",
    roles: ["admin", "user"],
    description: "Modifie un profil par son identifiant.",
    curl: `curl -X PUT http://localhost:3000/profils/69c2a2706d842427b23722db \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token_jwt_valide>" \
-d '{
  "pseudo": "alex_modifie",
  "email": "alex2@example.com"
}'`,
    response: `{
  "_id": "69c2a2706d842427b23722db",
  "pseudo": "alex_modifie",
  "email": "alex2@example.com",
  "isAdmin": false,
  "__v": 0
}`,
  },
];

export default function Documentation() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const visibleRoutes = routes.filter((route) => {
    if (isAdmin) {
      return route.roles.includes("admin");
    }
    return route.roles.includes("user");
  });

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
      <h1>Documentation API REST</h1>
      <p>
        Les routes protégées nécessitent un token JWT. Obtenez-le via la route
        <code> POST /profils/connexion </code>
      
      </p>
      <hr />
      <p>
        Profil connecté : <strong>{isAdmin ? "Administrateur" : "Utilisateur"}</strong>
      </p>

    <button className="back-btn" onClick={() => (window.location.href = "/dashboard")} style={{ marginTop: "10px" }}>
        Retour au dashboard
    </button>
     <hr />


      {visibleRoutes.map((route) => (
        <div
          key={route.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1.5rem",
            backgroundColor: "#fafafa",
          }}
        >
          <h3>
            {route.method} {route.path}
          </h3>

          <p><strong>Description :</strong> {route.description}</p>
          <p><strong>Type HTTP :</strong> {route.method}</p>
          <p><strong>Route :</strong> {route.path}</p>

          <strong>Exemple curl :</strong>
          <pre style={{ background: "#eee", padding: "1rem", borderRadius: "6px", overflowX: "auto" }}>
            {route.curl}
          </pre>

          <strong>Retour :</strong>
          <pre style={{ background: "#eee", padding: "1rem", borderRadius: "6px", overflowX: "auto" }}>
            {route.response}
          </pre>
        </div>
      ))}
    </div>
  );
}