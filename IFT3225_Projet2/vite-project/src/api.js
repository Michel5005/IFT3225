export const api = async (url, method = "GET", body = null) => {
    const token = localStorage.getItem("token");

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
        ...(body && { body: JSON.stringify(body) })
    };

    const res = await fetch(`http://localhost:3000/profils${url}`, options);

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw error;
    }

    return res.json();
}