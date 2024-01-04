async function loadUsers() {
    try {
        console.log("Chargement des utilisateurs...");
        const response = await fetch("http://localhost:8000/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Erreur lors de la récupération des utilisateurs : ", response.status, response.statusText);
            return;
        }

        const users = await response.json();
        console.log("Utilisateurs chargés : ", users);

        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // Efface le contenu précédent

        users.forEach(user => {
            const userRow = document.createElement("tr");
            userRow.innerHTML = `
          <td>${user.lastname}</td>
          <td>${user.firstname}</td>
          <td>${user.email}</td>
        `;
            userList.appendChild(userRow);
        });

        // Initialise la DataTable après avoir ajouté les lignes à la table
        $('#userTable').DataTable();
    } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
    }
}

// Charger la liste des utilisateurs au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
});

//Stockage du token dans le local storage
async function loginUser(email, password) {
    try {
        const response = await fetch("http://localhost:8000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}) // Les données de connexion
        });

        if (!response.ok) {
            console.error("Erreur de connexion : ", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        console.log("Connexion réussie, token reçu: ", data.token);
        localStorage.setItem('token', data.token); // Stockage du token dans localStorage

    } catch (error) {
        console.error("Erreur lors de la connexion", error);
    }
}

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await loginUser(email, password);
});




