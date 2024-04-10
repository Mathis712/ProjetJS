// Génère les styles CSS pour les cellules de 1 à 35 avec des couleurs aléatoires
let cssContent = '';
for (let i = 1; i <= 35; i++) {
    let color = '#' + Math.floor(Math.random()*16777215).toString(16); // Génère une couleur hexadécimale aléatoire
    cssContent += `#cell-${i} {
        background-color: ${color};
    }\n`;
}

// Crée un élément <style> pour contenir les styles générés
let styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.appendChild(document.createTextNode(cssContent));

// Ajoute le <style> à la fin du <head> du document
document.head.appendChild(styleElement);


let size = 3; // Définis la taille initiale
let mode = "default";

// Récupère les références des boutons
let _3x3button = document.getElementById("3x3");
let _4x4button = document.getElementById("4x4");
let _5x5button = document.getElementById("5x5");
let _6x6button = document.getElementById("6x6");

// Ajoute un écouteur d'événement à chaque bouton
_3x3button.addEventListener("click", function () {
    size = 3; // Met à jour le mode lorsque le bouton 3x3 est cliqué
    initializeGrid();
    shuffleGrid();
    updateGrid();
    stopTimer();
});

_4x4button.addEventListener("click", function () {
    size = 4; // Met à jour le mode lorsque le bouton 4x4 est cliqué
    initializeGrid();
    shuffleGrid();
    updateGrid();
    stopTimer();
});

_5x5button.addEventListener("click", function () {
    size = 5; // Met à jour le mode lorsque le bouton 5x5 est cliqué
    initializeGrid();
    shuffleGrid();
    updateGrid();
    stopTimer();
});

_6x6button.addEventListener("click", function () {
    size = 6; // Met à jour le mode lorsque le bouton 6x6 est cliqué
    initializeGrid();
    shuffleGrid();
    updateGrid();
    stopTimer();
});



let mainElement = document.querySelector('main');

let myGrid = document.createElement("div");
myGrid.id = "content";

let gridState = [];
let victoryMessage = document.createElement("div");

function initializeGrid(){
    victoryMessage.innerText = '';
switch (size) {
    case 3:
        gridState = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0]  // Utilise 0 pour représenter la case vide
        ];
        myGrid.id="content3x3";
        break;
    case 4:
        gridState = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],  // Utilise 0 pour représenter la case vide
            [13, 14, 15, 0]
        ];
        myGrid.id="content4x4";
        break;
    case 5:
        gridState = [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],  // Utilise 0 pour représenter la case vide
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 0]
        ];
        myGrid.id="content5x5";
        break;
    case 6:
        gridState = [
            [1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12],
            [13, 14, 15, 16, 17, 18],  // Utilise 0 pour représenter la case vide
            [19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30],
            [31, 32, 33, 34, 35, 0]
        ];
        myGrid.id="content6x6";
        break;
}
}
initializeGrid();

// Fonction pour mélanger la grille tout en garantissant que le puzzle est résolvable
function shuffleGrid_() {
    // Effectuez un nombre pair de mouvements aléatoires
    const numMoves = 10000; // Nombre de mouvements aléatoires
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

function shuffleGrid() {
    const numRows = gridState.length;
    const numCols = gridState[0].length;
    
    // Nombre de mouvements aléatoires à effectuer pour mélanger la grille
    const numMoves = Math.floor(Math.random() * 1000) + 500; // Nombre aléatoire entre 500 et 1500
    
    // Fonction pour obtenir les coordonnées de la case vide
    function trouverCaseVide() {
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (gridState[i][j] === 0) {
                    return [i, j];
                }
            }
        }
    }
    
    // Fonction pour échanger deux valeurs dans la grille
    function echangerValeurs(coord1, coord2) {
        const temp = gridState[coord1[0]][coord1[1]];
        gridState[coord1[0]][coord1[1]] = gridState[coord2[0]][coord2[1]];
        gridState[coord2[0]][coord2[1]] = temp;
    }
    
    // Boucle pour effectuer les mouvements aléatoires
    for (let i = 0; i < numMoves; i++) {
        const [emptyRow, emptyCol] = trouverCaseVide();
        const possibleMoves = [];
        
        // Vérifier les mouvements possibles à partir de la case vide
        if (emptyRow > 0) possibleMoves.push([emptyRow - 1, emptyCol]); // Déplacer vers le haut
        if (emptyRow < numRows - 1) possibleMoves.push([emptyRow + 1, emptyCol]); // Déplacer vers le bas
        if (emptyCol > 0) possibleMoves.push([emptyRow, emptyCol - 1]); // Déplacer vers la gauche
        if (emptyCol < numCols - 1) possibleMoves.push([emptyRow, emptyCol + 1]); // Déplacer vers la droite
        
        // Choisir un mouvement aléatoire parmi les mouvements possibles
        const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length);
        const randomMove = possibleMoves[randomMoveIndex];
        
        // Échanger la case vide avec la case choisie aléatoirement
        echangerValeurs([emptyRow, emptyCol], randomMove);
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

let startTime = null;
let timerID = null;
let elapsedTime = 0;
let timerStarted = false; // Variable pour suivre l'état du timer

// Fonction pour démarrer le timer
function startTimer() {
    stopTimer(); // Arrête le timer s'il est déjà en cours
    if (!timerStarted) {
        elapsedTime = 0; // Réinitialise le temps écoulé si le timer n'a jamais démarré
    }
    startTime = Date.now() - elapsedTime; // Démarre le timer en tenant compte du temps déjà écoulé
    timerID = setInterval(function () {
        let currentTime = Date.now(); // Heure actuelle
        elapsedTime = currentTime - startTime; // Calcule le temps écoulé
        displayElapsedTime(elapsedTime); // Affiche le temps écoulé
    }, 1000); // Met à jour l'affichage toutes les secondes
    timerStarted = true; // Met à jour l'état du timer
}

// Fonction pour arrêter le timer
function stopTimer() {
    clearInterval(timerID); // Arrête le timer
    timerStarted = false; // Met à jour l'état du timer
}



// Fonction pour initialiser la grille dans le DOM en fonction de l'état actuel
function updateGrid() {
    myGrid.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let gridTile = document.createElement("div");
            gridTile.className = "cell";
            gridTile.id = `cell-${gridState[i][j]}`;
            if ((gridState[i][j] !== 0) && (mode != "withoutNumbers")) {
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
                            updateGrid();
                            // Démarrer le timer uniquement si ce n'est pas déjà démarré
                            if (!timerStarted) {
                                startTimer();
                            }
                        }

                    }
                }
            }
        });
    });

    // Appelez detectWin() en dehors de la boucle forEach
    detectWin();

}


updateGrid(); // Assurez-vous d'initialiser d'abord la grille

let gridContainer = document.createElement("div");
gridContainer.id = "gridContainer";
gridContainer.appendChild(myGrid);
mainElement.appendChild(gridContainer);

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
let timerContainer = document.createElement("div");
timerContainer.id = "timerContainer";
timerContainer.appendChild(timerDisplay);
mainElement.appendChild(timerContainer);




// Dans la fonction detectWin(), affichez le message de victoire avec le temps écoulé
function detectWin() {
    let n = 1;
    let win = true;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!(gridState[i][j] === n)) {
                win = false;
            }
            n = (n + 1) % (size * size);
        }
    }
    if (win) {
        
        console.log("win");
        stopTimer();
        timerStarted = false;
        // Affichez un message de victoire sur la page
        victoryMessage.textContent = "Félicitations !";
        mainElement.appendChild(victoryMessage);
    }
}

function reset(){
    stopTimer();
    initializeGrid();
    shuffleGrid();
    updateGrid();
    timerStarted = false;
    elapsedTime = 0;
}

let replayButton = document.getElementById("replay");
replayButton.addEventListener('click', function () {
    reset();
});

let classicButton = document.getElementById("classic");
classicButton.addEventListener('click',function(){
    mode = "classic";
    updateGrid();
})

let withoutNumbersButton = document.getElementById("withoutNumbers");
withoutNumbersButton.addEventListener('click',function(){
    mode = "withoutNumbers";
    updateGrid();
})

let withoutImageButton = document.getElementById("withoutImage");
withoutImageButton.addEventListener('click',function(){
    mode = "withoutImage";
    updateGrid();
})
