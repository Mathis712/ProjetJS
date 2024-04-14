import { Taquin } from "./taquin.js";
import { time } from "./chrono.js";

/*
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
        //stopTimer();
        time.stop();

        //timerStarted = false;
        // Affichez un message de victoire sur la page
        victoryMessage.textContent = "Félicitations !";
        mainElement.appendChild(victoryMessage);
    }
}
*/
export function reset(size, mode) {
    time.stop();
    time.initialTimer();
    let taquin = new Taquin(size, mode);
    taquin.update(mode);
}



let randomImageButton = document.querySelector("#demo1 button:last-of-type");
randomImageButton.addEventListener("click", function() {
    loadRandomImage(size);
});


export function loadRandomImage(size) {
    let imageUrl = "toto.jpg"; // Chemin vers l'image (assurez-vous qu'il est correct)
    let image = new Image();
    image.onload = function() {
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
                cell.innerText = ''; // Efface le texte
            }
        }
    };
    image.onerror = function() {
        console.error("Erreur lors du chargement de l'image.");
    };
    image.src = imageUrl;
}