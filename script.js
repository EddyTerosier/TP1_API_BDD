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
  