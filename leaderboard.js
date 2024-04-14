
      // Exemple de variable contenant les données du leaderboard
      const leaderboardData = [
        { position: 1, name: "Johnnn", score: 10000000 },
        { position: 2, name: "Jane", score: 950 },
        { position: 3, name: "Bob", score: 900 },
        // Ajoute d'autres entrées au besoin
      ];

      // Fonction pour générer le contenu de la table à partir des données du leaderboard
      function generateLeaderboardTable(data) {
        const tableBody = document.getElementById("leaderboard-table");

        data.forEach((entry) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${entry.position}</td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
            `;
          tableBody.appendChild(row);
        });
      }

      // Appel de la fonction avec les données du leaderboard
      generateLeaderboardTable(leaderboardData);