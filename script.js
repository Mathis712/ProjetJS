let mainElement = document.querySelector('main');

let myGrid = document.createElement("div");
myGrid.id = "content";

// Crée un tableau bidimensionnel pour représenter la grille
let gridState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]  // Utilise 0 pour représenter la case vide
];


// Fonction pour mélanger la grille tout en garantissant que le puzzle est résolvable
function shuffleGrid() {
    // Effectuez un nombre pair de mouvements aléatoires
    const numMoves = 100; // Nombre de mouvements aléatoires
    for (let i = 0; i < numMoves; i++) {
        // Choisissez aléatoirement une direction de mouvement (haut, bas, gauche, droite)
        const direction = Math.floor(Math.random() * 4); // 0: haut, 1: bas, 2: gauche, 3: droite

        // Effectuez le mouvement dans la direction choisie
        switch (direction) {
            case 0: // Haut
                moveTileUp();
                break;
            case 1: // Bas
                moveTileDown();
                break;
            case 2: // Gauche
                moveTileLeft();
                break;
            case 3: // Droite
                moveTileRight();
                break;
        }
    }
}

// Fonction pour effectuer un mouvement vers le haut (si possible)
function moveTileUp() {
    const emptyCell = findEmptyCell();
    if (emptyCell.row > 0) {
        // Échange la tuile vide avec la tuile au-dessus
        const temp = gridState[emptyCell.row - 1][emptyCell.col];
        gridState[emptyCell.row - 1][emptyCell.col] = gridState[emptyCell.row][emptyCell.col];
        gridState[emptyCell.row][emptyCell.col] = temp;
    }
}

// Fonction pour effectuer un mouvement vers le bas (si possible)
function moveTileDown() {
    const emptyCell = findEmptyCell();
    if (emptyCell.row < 2) {
        // Échange la tuile vide avec la tuile en dessous
        const temp = gridState[emptyCell.row + 1][emptyCell.col];
        gridState[emptyCell.row + 1][emptyCell.col] = gridState[emptyCell.row][emptyCell.col];
        gridState[emptyCell.row][emptyCell.col] = temp;
    }
}

// Fonction pour effectuer un mouvement vers la gauche (si possible)
function moveTileLeft() {
    const emptyCell = findEmptyCell();
    if (emptyCell.col > 0) {
        // Échange la tuile vide avec la tuile à gauche
        const temp = gridState[emptyCell.row][emptyCell.col - 1];
        gridState[emptyCell.row][emptyCell.col - 1] = gridState[emptyCell.row][emptyCell.col];
        gridState[emptyCell.row][emptyCell.col] = temp;
    }
}

// Fonction pour effectuer un mouvement vers la droite (si possible)
function moveTileRight() {
    const emptyCell = findEmptyCell();
    if (emptyCell.col < 2) {
        // Échange la tuile vide avec la tuile à droite
        const temp = gridState[emptyCell.row][emptyCell.col + 1];
        gridState[emptyCell.row][emptyCell.col + 1] = gridState[emptyCell.row][emptyCell.col];
        gridState[emptyCell.row][emptyCell.col] = temp;
    }
}

// Fonction pour trouver la position de la case vide (0)
function findEmptyCell() {
    for (let row = 0; row < gridState.length; row++) {
        for (let col = 0; col < gridState[row].length; col++) {
            if (gridState[row][col] === 0) {
                return { row: row, col: col };
            }
        }
    }
}

// Mélanger la grille
shuffleGrid();

// Afficher la grille mélangée
console.log(gridState);

let startTime;
let timerID;
let elapsedTime = 0; // Initialise le temps écoulé à 0
let hasStarted = false;

// Fonction pour démarrer le timer
function startTimer() {
    startTime = Date.now() - elapsedTime; // Démarre le timer en tenant compte du temps déjà écoulé
    timerID = setInterval(function () {
        let currentTime = Date.now(); // Heure actuelle
        elapsedTime = currentTime - startTime; // Calcule le temps écoulé
        displayElapsedTime(elapsedTime); // Affiche le temps écoulé
    }, 1000); // Met à jour l'affichage toutes les secondes
}

// Fonction pour arrêter le timer
function stopTimer() {
    clearInterval(timerID); // Arrête le timer
}


// Fonction pour initialiser la grille dans le DOM en fonction de l'état actuel
function initializeGrid() {
    myGrid.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let gridTile = document.createElement("div");
            gridTile.className = "cell";
            gridTile.id = `cell-${gridState[i][j]}`;
            if (gridState[i][j] !== 0) {
                gridTile.textContent = gridState[i][j]; // Affiche le numéro de la case
            }
            myGrid.appendChild(gridTile);
        }
    }
    const gridTiles = myGrid.getElementsByClassName('cell'); // Sélectionnez les éléments avec la classe '.cell'

    // Ajoutez l'écouteur d'événements en dehors de la boucle forEach
    Array.from(gridTiles).forEach(gridTile => {
        gridTile.addEventListener('click', function (event) {

            let emptyTileX, emptyTileY;

            for (let i = 0; i < gridState.length; i++) {
                for (let j = 0; j < gridState[i].length; j++) {
                    if (gridState[i][j] === 0) {
                        emptyTileX = i;
                        emptyTileY = j;
                    }
                }
            }

            for (let i = 0; i < gridState.length; i++) {
                for (let j = 0; j < gridState[i].length; j++) {
                    if (gridState[i][j] == gridTile.id.split('-')[1]) {

                        if ((i === emptyTileX - 1 && j === emptyTileY) || (i === emptyTileX + 1 && j === emptyTileY) || (i === emptyTileX && j === emptyTileY - 1) || (i === emptyTileX && j === emptyTileY + 1)) {
                            temp = gridState[i][j];
                            gridState[i][j] = 0;
                            gridState[emptyTileX][emptyTileY] = temp;
                            initializeGrid();
                            // Démarrer le timer uniquement si ce n'est pas déjà démarré
                            if (!hasStarted) {
                                startTimer();
                                hasStarted = true;
                            }
                        }

                    }
                }
            }
        });
    });

    console.log("initialize");
    // Appelez detectWin() en dehors de la boucle forEach
    detectWin();

}


initializeGrid(); // Assurez-vous d'initialiser d'abord la grille


mainElement.appendChild(myGrid);

// Fonction pour afficher le temps écoulé en minutes, secondes et millisecondes
function displayElapsedTime(time) {
    // Convertit le temps en millisecondes en minutes, secondes et millisecondes
    let minutes = Math.floor(time / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    // Formate le temps en chaîne de caractères
    let formattedTime = `${minutes}\' ${seconds}`;

    // Affiche le temps écoulé sur la page
    let timerElement = document.getElementById('timer');
    timerElement.textContent = "Temps écoulé : " + formattedTime;
}


// Code HTML pour afficher le temps écoulé
let timerDisplay = document.createElement("div");
timerDisplay.id = "timer";
mainElement.appendChild(timerDisplay);




// Dans la fonction detectWin(), affichez le message de victoire avec le temps écoulé
function detectWin() {
    if (gridState[0][0] === 1 && gridState[0][1] === 2 && gridState[0][2] === 3 && gridState[1][0] === 4 && gridState[1][1] === 5 && gridState[1][2] === 6 && gridState[2][0] === 7 && gridState[2][1] === 8 && gridState[2][2] === 0) {
        console.log("win");
        stopTimer();
        // Affichez un message de victoire sur la page
        let victoryMessage = document.createElement("div");
        victoryMessage.textContent = "Félicitations !";
        mainElement.appendChild(victoryMessage);
    }
}


let replayButton = document.getElementById("replay");
replayButton.addEventListener('click',function(){
    shuffleGrid();
});