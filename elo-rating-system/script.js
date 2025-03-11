// Elo Rating Calculation Function
function calculateElo(winnerRating, loserRating) {
    const k = 32; // Elo K-factor
    const expectedWin = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
    const newWinnerRating = Math.round(winnerRating + k * (1 - expectedWin));
    const newLoserRating = Math.round(loserRating + k * (0 - (1 - expectedWin)));
    return { newWinnerRating, newLoserRating };
}

// Fetch and Display Players
fetch('players.json')
    .then(response => response.json())
    .then(players => {
        const tableBody = document.querySelector("#playerTable tbody");
        tableBody.innerHTML = "";
        players.sort((a, b) => b.rating - a.rating).forEach(player => {
            const row = `<tr><td>${player.id}</td><td>${player.name}</td><td>${player.rating}</td></tr>`;
            tableBody.innerHTML += row;
        });
    });

// Fetch and Display Matches
fetch('matches.json')
    .then(response => response.json())
    .then(matches => {
        const matchTable = document.querySelector("#matchTable tbody");
        matchTable.innerHTML = "";
        matches.forEach(match => {
            const row = `<tr>
                <td>${match.winner}</td>
                <td>${match.loser}</td>
                <td>${match.winner_new_rating} / ${match.loser_new_rating}</td>
            </tr>`;
            matchTable.innerHTML += row;
        });
    });

// Handle Match Result Submission
document.getElementById("matchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const winnerId = document.getElementById("winner").value;
    const loserId = document.getElementById("loser").value;

    fetch('players.json')
        .then(response => response.json())
        .then(players => {
            const winner = players.find(p => p.id === winnerId);
            const loser = players.find(p => p.id === loserId);

            if (!winner || !loser) {
                alert("Invalid Player IDs");
                return;
            }

            // Calculate new ratings
            const { newWinnerRating, newLoserRating } = calculateElo(winner.rating, loser.rating);
            alert(`New Ratings:\n${winner.name}: ${newWinnerRating}\n${loser.name}: ${newLoserRating}\n\nManually update players.json on GitHub!`);

            // This does NOT save automatically - must be updated manually on GitHub.
        });
});
