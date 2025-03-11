const GITHUB_USERNAME = "pseudoboertjie";  
const REPO_NAME = "elo-rating-system";  
const FILE_PATH = "players.json";  
const TOKEN = "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"; // ⚠️ NEVER expose this in frontend!

// Function to get the latest file content from GitHub
async function fetchFileContent() {
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;
    const response = await fetch(url, {
        headers: {
            "Authorization": `token ${TOKEN}`
        }
    });
    return await response.json();
}

// Function to update the JSON file on GitHub
async function updateJSONFile(updatedContent) {
    const fileData = await fetchFileContent();
    const newContent = btoa(JSON.stringify(updatedContent, null, 2)); // Encode JSON to base64

    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`, {
        method: "PUT",
        headers: {
            "Authorization": `token ${TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Updated player ratings",
            content: newContent,
            sha: fileData.sha // Required for updating an existing file
        })
    });

    if (response.ok) {
        alert("Players.json updated successfully!");
        location.reload(); // Refresh to show updated ratings
    } else {
        alert("Failed to update players.json");
    }
}

// Function to update player ratings
async function updateRatings(winnerId, loserId) {
    let players = await fetch("players.json").then(res => res.json());

    let winner = players.find(p => p.id === winnerId);
    let loser = players.find(p => p.id === loserId);

    if (!winner || !loser) {
        alert("Invalid Player IDs");
        return;
    }

    const { newWinnerRating, newLoserRating } = calculateElo(winner.rating, loser.rating);
    winner.rating = newWinnerRating;
    loser.rating = newLoserRating;

    // Save updated JSON file to GitHub
    updateJSONFile(players);
}

// Attach event listener to form
document.getElementById("matchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const winnerId = document.getElementById("winner").value;
    const loserId = document.getElementById("loser").value;
    updateRatings(winnerId, loserId);
});

// Elo rating calculation
function calculateElo(winnerRating, loserRating, kFactor = 32) {
    const expectedWinner = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (winnerRating - loserRating) / 400));

    return {
        newWinnerRating: Math.round(winnerRating + kFactor * (1 - expectedWinner)),
        newLoserRating: Math.round(loserRating + kFactor * (0 - expectedLoser))
    };
}
