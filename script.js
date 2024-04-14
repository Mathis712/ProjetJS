import { reset } from "./functions.js";
import { Taquin } from "./taquin.js";

// Récupère une référence du bouton "Image aléatoire"
let randomImageButton = document.querySelector("#demo1 button:last-of-type");

// Ajoute un écouteur d'événements pour le clic sur le bouton "Image aléatoire"
randomImageButton.addEventListener("click", function () {
    size = getSize(); // Récupère la taille actuelle du taquin
    loadRandomImage(size); // Charge une image aléatoire
    reset(size, mode); // Réinitialise la grille
});

// Définir une fonction pour obtenir la taille actuelle du taquin
function getSize() {

    return size;

}

export function loadRandomImage(size) {
    let imageUrl = "toto.jpg"; // Chemin vers l'image (assurez-vous qu'il est correct)
    let image = new Image();
    image.onload = function () {
        // Image chargée avec succès
        let canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let tileSize = Math.floor(image.width / size);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let tileCanvas = document.createElement('canvas');
                tileCanvas.width = tileSize;
                tileCanvas.height = tileSize;
                let tileContext = tileCanvas.getContext('2d');
                tileContext.putImageData(imageData, -j * tileSize, -i * tileSize);
                let tileImage = tileCanvas.toDataURL(); // Convertit le contenu du canvas en URL de données (data URL)
                let cell = document.getElementById(`cell-${i * size + j + 1}`);
                cell.style.backgroundImage = `url(${tileImage})`;
                cell.style.backgroundSize = 'cover';
                //cell.innerText = ''; // Efface le texte
            }
        }
    };
    image.onerror = function () {
        console.error("Erreur lors du chargement de l'image.");
    };
    image.src = imageUrl;
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

// Ajoute un écouteur d'événement à chaque bouton
_3x3button.addEventListener("click", function () {
    size = 3;
    if (mode === "withoutNumbers") {
        loadRandomImage(size);
        
    }
    reset(size, mode);
});

_4x4button.addEventListener("click", function () {
    
    size = 4;
    if (mode === "withoutNumbers") {
        loadRandomImage(size);
        
    }
    reset(size, mode);

});

_5x5button.addEventListener("click", function () {
    
    size = 5;
    if (mode === "withoutNumbers") {
        loadRandomImage(size);
        
    }
    reset(size, mode);

});

_6x6button.addEventListener("click", function () {
    
    size = 6;
    if (mode === "withoutNumbers") {
        loadRandomImage(size);
        
    }
    reset(size, mode);

});





let replayButton = document.getElementById("replay");
replayButton.addEventListener('click', function () {

    if (mode === "withoutNumbers") {
        loadRandomImage(size);
        
    }
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
    loadRandomImage(size);
    reset(size, mode);

});

let withoutImageButton = document.getElementById("withoutImage");
withoutImageButton.addEventListener('click', function () {

    mode = "withoutImage";
    reset(size, mode);

});

let gridContainer = document.createElement("div");
gridContainer.id = "gridContainer";
// let gridContainer = document.getElementById('gridContainer');   
// let mainElement = document.querySelector('main');
let mainElement = document.getElementById('taquingrid');
mainElement.appendChild(gridContainer);
let taquin = new Taquin(3)

let darkModeToggle = document.getElementById("darkModeToggle");
let bodyElement = document.body;

darkModeToggle.addEventListener("click", function () {
    bodyElement.classList.toggle("dark-mode");
    if (bodyElement.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Mode Clair";
    } else {
        darkModeToggle.textContent = "Mode Sombre";
    }
});


