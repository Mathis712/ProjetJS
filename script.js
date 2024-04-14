import { reset, loadRandomImage } from "./functions.js";
import { Taquin } from "./taquin.js";

// Récupère une référence du bouton "Image aléatoire"
let randomImageButton = document.querySelector("#demo1 button:last-of-type");

// Ajoute un écouteur d'événements pour le clic sur le bouton "Image aléatoire"
randomImageButton.addEventListener("click", function() {
    size = getSize(); // Récupère la taille actuelle du taquin
    loadRandomImage(size); // Charge une image aléatoire
    reset(size, mode); // Réinitialise la grille
});

// Définir une fonction pour obtenir la taille actuelle du taquin
function getSize() {

    return size;

}

// Ajoute une classe spécifique aux cellules pour différencier celles contenant des morceaux d'image
function addImageClassToCells() {
    let gridTiles = document.getElementsByClassName('cell');
    for (let tile of gridTiles) {
        tile.classList.add("image-cell");
    }
}

let size = 3;
let mode = "classic";

// Génère les styles CSS pour les cellules de 1 à 35 avec des couleurs aléatoires
let cssContent = '';
for (let i = 1; i <= 35; i++) {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Génère une couleur hexadécimale aléatoire
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

// Récupère les références des boutons
let _3x3button = document.getElementById("3x3");
let _4x4button = document.getElementById("4x4");
let _5x5button = document.getElementById("5x5");
let _6x6button = document.getElementById("6x6");
let leaderboardButton = document.getElementById("leaderboard");

// Ajoute un écouteur d'événement à chaque bouton
_3x3button.addEventListener("click", function () {

    size = 3;
    reset(size, mode);
});

_4x4button.addEventListener("click", function () {
size = 4;

    reset(size, mode);

});

_5x5button.addEventListener("click", function () {

    size = 5;
    reset(size, mode);

});

_6x6button.addEventListener("click", function () {

    size = 6;
    reset(size, mode);

});

leaderboardButton.addEventListener("click", function () {

    

});

let replayButton = document.getElementById("replay");
replayButton.addEventListener('click', function () {

    reset(size, mode);

});

let classicButton = document.getElementById("classic");
classicButton.addEventListener('click', function () {

    mode = "classic";
    reset(size, mode);

});

let withoutNumbersButton = document.getElementById("withoutNumbers");
withoutNumbersButton.addEventListener('click', function () {

    mode = "withoutNumbers";
    reset(size, mode);

});

let withoutImageButton = document.getElementById("withoutImage");
withoutImageButton.addEventListener('click', function () {

    mode = "withoutImage";
    reset(size, mode);

});

let gridContainer = document.createElement("div");
gridContainer.id = "gridContainer";
let mainElement = document.querySelector('main');
mainElement.appendChild(gridContainer);
let taquin = new Taquin(3)

let darkModeToggle = document.getElementById("darkModeToggle");
let bodyElement = document.body;

darkModeToggle.addEventListener("click", function() {
    bodyElement.classList.toggle("dark-mode");
    if (bodyElement.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Mode Clair";
    } else {
        darkModeToggle.textContent = "Mode Sombre";
    }
});




// Mélanger la grille
//shuffleGrid();





/*
// Fonction pour initialiser la grille dans le DOM en fonction de l'état actuel
function updateGrid() {
    console.log("rentre");
    myGrid.innerHTML = '';

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
                        console.log("avant");
                        if ((i === emptyTileX - 1 && j === emptyTileY) || (i === emptyTileX + 1 && j === emptyTileY) || (i === emptyTileX && j === emptyTileY - 1) || (i === emptyTileX && j === emptyTileY + 1)) {
                            console.log("apres");

                            temp = gridState[i][j];
                            gridState[i][j] = 0;
                            gridState[emptyTileX][emptyTileY] = temp;
                            updateGrid();
                            // Démarrer le timer uniquement si ce n'est pas déjà démarré
                            
                            console.log("this");

                            time.start();
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
*/



