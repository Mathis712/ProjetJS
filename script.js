import { reset } from "./functions.js"; // Importer la fonction reset depuis un autre fichier
import { Taquin } from "./taquin.js"; // Importer la classe Taquin depuis un autre fichier

// Récupérer une référence du bouton "Image aléatoire"
let randomImageButton = document.querySelector("#demo1 button:last-of-type");

// Ajouter un écouteur d'événements pour le clic sur le bouton "Image aléatoire"
randomImageButton.addEventListener("click", function () {
    size = getSize(); // Récupérer la taille actuelle du taquin
    loadRandomImage(size); // Charger une image aléatoire
    reset(size, mode); // Réinitialiser la grille
});

// Définir une fonction pour obtenir la taille actuelle du taquin
function getSize() {
    return size;
}

// Exporter une fonction loadRandomImage
export function loadRandomImage(size) {
    // Définir le chemin vers l'image
    let imageUrl = "as-junia.jpg"; // Assurez-vous que le chemin est correct
    let image = new Image();
    image.onload = function () {
        // Image chargée avec succès
        // Créer un canvas pour dessiner l'image
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
            }
        }
    };
    image.onerror = function () {
        console.error("Erreur lors du chargement de l'image.");
    };
    image.src = imageUrl;
}

// Définir la taille et le mode par défaut
let size = 3;
let mode = "classic";

// Générer des styles CSS pour les cellules de 1 à 35 avec des couleurs aléatoires
let cssContent = '';
for (let i = 1; i <= 35; i++) {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Générer une couleur hexadécimale aléatoire
    cssContent += `#cell-${i} {
        background-color: ${color};
    }\n`;
}

// Créer un élément <style> pour contenir les styles générés
let styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.appendChild(document.createTextNode(cssContent));

// Ajouter le <style> à la fin du <head> du document
document.head.appendChild(styleElement);

// Récupérer les références des boutons de taille
let _3x3button = document.getElementById("3x3");
let _4x4button = document.getElementById("4x4");
let _5x5button = document.getElementById("5x5");
let _6x6button = document.getElementById("6x6");

// Bouton 3x3
_3x3button.addEventListener("click", function () {
    size = 3;
    if (mode === "withoutNumbers") {
        loadRandomImage(size); // Charger une image aléatoire si le mode est "withoutNumbers"
    }
    reset(size, mode); // Réinitialiser la grille
});

// Bouton 4x4
_4x4button.addEventListener("click", function () {
    size = 4;
    if (mode === "withoutNumbers") {
        loadRandomImage(size); // Charger une image aléatoire si le mode est "withoutNumbers"
    }
    reset(size, mode); // Réinitialiser la grille
});

// Bouton 5x5
_5x5button.addEventListener("click", function () {
    size = 5;
    if (mode === "withoutNumbers") {
        loadRandomImage(size); // Charger une image aléatoire si le mode est "withoutNumbers"
    }
    reset(size, mode); // Réinitialiser la grille
});

// Bouton 6x6
_6x6button.addEventListener("click", function () {
    size = 6;
    if (mode === "withoutNumbers") {
        loadRandomImage(size); // Charger une image aléatoire si le mode est "withoutNumbers"
    }
    reset(size, mode); // Réinitialiser la grille
});

// Sélectionne le bouton de rejouer par son ID
let replayButton = document.getElementById("replay");

// Ajoute un écouteur d'événements pour le clic sur le bouton de rejouer
replayButton.addEventListener('click', function () {
    // Si le mode est "withoutNumbers", charge une image aléatoire
    if (mode === "withoutNumbers") {
        loadRandomImage(size);
    }
    // Réinitialise le jeu avec la taille et le mode actuels
    reset(size, mode);
});

// Sélectionne le bouton de mode classique par son ID
let classicButton = document.getElementById("classic");

// Ajoute un écouteur d'événements pour le clic sur le bouton de mode classique
classicButton.addEventListener('click', function () {
    // Définit le mode sur "classic"
    mode = "classic";
    // Réinitialise le jeu avec la taille et le mode actuels
    reset(size, mode);
});

// Sélectionne le bouton de mode sans nombres par son ID
let withoutNumbersButton = document.getElementById("withoutNumbers");

// Ajoute un écouteur d'événements pour le clic sur le bouton de mode sans nombres
withoutNumbersButton.addEventListener('click', function () {
    // Définit le mode sur "withoutNumbers"
    mode = "withoutNumbers";
    // Charge une image aléatoire si le mode est "withoutNumbers"
    loadRandomImage(size);
    // Réinitialise le jeu avec la taille et le mode actuels
    reset(size, mode);
});

// Sélectionne le bouton de mode sans image par son ID
let withoutImageButton = document.getElementById("withoutImage");

// Ajoute un écouteur d'événements pour le clic sur le bouton de mode sans image
withoutImageButton.addEventListener('click', function () {
    // Définit le mode sur "withoutImage"
    mode = "withoutImage";
    // Réinitialise le jeu avec la taille et le mode actuels
    reset(size, mode);
});

// Créer un conteneur pour la grille de jeu
let gridContainer = document.createElement("div");
gridContainer.id = "gridContainer";
let mainElement = document.getElementById('taquingrid');
mainElement.appendChild(gridContainer);

// Créer une instance de la classe Taquin avec une taille par défaut de 3
let taquin = new Taquin(3);

// Récupérer la référence du bouton de basculement de mode sombre
let darkModeToggle = document.getElementById("darkModeToggle");
let bodyElement = document.body;

// Ajouter un écouteur d'événements au bouton de basculement de mode sombre
darkModeToggle.addEventListener("click", function () {
    // Bascule la classe "dark-mode" sur le corps du document
    bodyElement.classList.toggle("dark-mode");
    // Modifier le texte du bouton de basculement en fonction du mode actuel
    if (bodyElement.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "Mode Clair";
    } else {
        darkModeToggle.textContent = "Mode Sombre";
    }
});
