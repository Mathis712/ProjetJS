import { time } from "./chrono.js"; // Importer la fonction time depuis un autre fichier

// Définir une classe Tile pour représenter une case du taquin
export class Tile {
    constructor(coordX, coordY, value, color, image) {
        this.coord = [coordX, coordY]; // Coordonnées de la case
        this.value = value; // Valeur de la case
        this.color = color; // Couleur de la case (non utilisée dans ce code)
        this.image = image; // Image de la case (non utilisée dans ce code)
        this.id = value; // Identifiant de la case
    }
}

// Définir une classe Grid pour représenter la grille de jeu
export class Grid {
    constructor(size) {
        this.size = size; // Taille de la grille
        this.tab = []; // Tableau de cases
        this.id = "content3x3"; // Identifiant de la grille par défaut

        // Sélectionner l'identifiant de la grille en fonction de la taille spécifiée
        switch (size) {
            case 3:
                this.id = "content3x3";
                break;
            case 4:
                this.id = "content4x4";
                break;
            case 5:
                this.id = "content5x5";
                break;
            case 6:
                this.id = "content6x6";
                break;
        }
    }
}

// Définir une classe Taquin pour représenter le jeu de taquin
export class Taquin {
    constructor(size, mode) {
        this.size = size; // Taille du taquin
        let grid = new Grid(size); // Créer une nouvelle grille
        // Créer un élément div pour la grille de jeu
        let myGrid = document.createElement("div");
        myGrid.id = grid.id;

        // Générer les cases du taquin et les ajouter à la grille
        let n = 1;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let myTile = document.createElement("div");
                let tile = new Tile(i, j, n, null, null); // Créer une nouvelle case
                if (n !== 0) {
                    myTile.innerText = n;
                }
                myTile.id = `cell-${tile.value}`;
                myTile.className = "cell";
                myTile.addEventListener('click', function () {
                    // Gérer le clic sur une case
                    var lastChild = timerContainer.firstElementChild;
                    var count = timerContainer.childElementCount;
                    if (count == 2) {
                        timerContainer.removeChild(lastChild);
                    }
                    time.start(); // Démarrer le chronomètre
                    this.move(tile, mode); // Déplacer la case cliquée
                    this.detectWin(); // Détecter si le joueur a gagné
                }.bind(this));
                grid.tab.push(tile); // Ajouter la case au tableau de cases
                myGrid.appendChild(myTile); // Ajouter la case à la grille
                n = (n + 1) % (size * size);
            }
        }

        this.grid = grid; // Assigner la grille à l'instance de Taquin
        this.div = myGrid; // Assigner l'élément div de la grille à l'instance de Taquin
        let mainElement = document.getElementById('taquingrid'); // Sélectionner l'élément parent de la grille
        let gridContainer = document.getElementById("gridContainer"); // Sélectionner le conteneur de la grille
        gridContainer.innerHTML = ''; // Effacer le contenu précédent du conteneur
        gridContainer.appendChild(myGrid); // Ajouter la grille au conteneur
        mainElement.appendChild(gridContainer); // Ajouter le conteneur à l'élément parent

        // Mélanger la grille pour commencer le jeu
        this.shuffle();
    }

    // Méthode pour mettre à jour l'affichage en fonction du mode de jeu
    update(mode) {
        // Parcourir toutes les cases de la grille
        for (let i = 0; i < this.grid.tab.length; i++) {
            let tile = this.grid.tab[i];
            let cell = document.getElementById(`cell-${tile.value}`);
            // Vérifier si le mode est "withoutNumbers" et s'il y a une image de fond pour cette case
            if (mode === "withoutNumbers" && cell.style.backgroundImage && cell.style.backgroundImage !== 'none') {
                cell.innerText = ''; // Effacer le texte de la case
            } else {
                if (mode !== "withoutNumbers") {
                    cell.innerText = tile.value === 0 ? '' : tile.value; // Mettre à jour le texte avec la valeur de la case
                } else {
                    cell.innerText = ''; // Effacer le texte de la case
                }
            }
        }
    }

    // Méthode pour déplacer une case lorsqu'elle est cliquée
    move(tileToMove, mode) {
        // Parcourir toutes les cases de la grille
        for (let i = 0; i < this.grid.tab.length; i++) {
            let tile = this.grid.tab[i];
            let cell = document.getElementById(`cell-${tile.value}`);
            // Vérifier les mouvements valides pour déplacer la case vide
            if ((tile.value === 0 && tileToMove.coord[0] === tile.coord[0] && tileToMove.coord[1] === tile.coord[1] + 1) ||
                (tile.value === 0 && tileToMove.coord[0] === tile.coord[0] && tileToMove.coord[1] === tile.coord[1] - 1) ||
                (tile.value === 0 && tileToMove.coord[0] === tile.coord[0] + 1 && tileToMove.coord[1] === tile.coord[1]) ||
                (tile.value === 0 && tileToMove.coord[0] === tile.coord[0] - 1 && tileToMove.coord[1] === tile.coord[1])) {

                // Échanger les valeurs, les identifiants, et les div dans la grille
                let tempValue = tile.value;
                tile.value = tileToMove.value;
                tileToMove.value = tempValue;
                let tempId = tile.id;
                tile.id = tileToMove.id;
                tileToMove.id = tempId;
                let cell1 = document.getElementById(`cell-${tile.value}`);
                let cell2 = document.getElementById(`cell-${tileToMove.value}`);
                cell1.id = `cell-${tileToMove.value}`;
                cell2.id = `cell-${tile.value}`;
                cell1.innerText = tileToMove.value === 0 ? '' : tileToMove.value;
                cell2.innerText = tile.value === 0 ? '' : tile.value;
                let tempBackground = cell.style.backgroundImage;
                cell.style.backgroundImage = cell1.style.backgroundImage;
                cell1.style.backgroundImage = tempBackground;

                this.update(mode); // Mettre à jour l'affichage après le déplacement
                break;
            }
        }
    }

    // Méthode pour mélanger aléatoirement la grille
    shuffle() {
        const numMoves = 10000; // Nombre de mouvements aléatoires pour mélanger la grille
        let n = 0;
        while (n < numMoves) {
            // Générer des coordonnées aléatoires pour déplacer une case
            const tileToMoveX = Math.floor(Math.random() * this.size);
            const tileToMoveY = Math.floor(Math.random() * this.size);
            // Parcourir toutes les cases de la grille
            for (let i = 0; i < this.grid.tab.length; i++) {
                // Trouver la case correspondante aux coordonnées aléatoires
                if (this.grid.tab[i].coord[0] === tileToMoveX && this.grid.tab[i].coord[1] === tileToMoveY) {
                    this.move(this.grid.tab[i]); // Déplacer la case
                }
            }
            n++;
        }
    }

    // Méthode pour détecter si le joueur a gagné
    detectWin() {
        let victoryMessage;
        victoryMessage = document.getElementById("victoryMessageContainer");
        if (victoryMessage == undefined) {
            victoryMessage = document.createElement("div");
        } else {
            victoryMessage.remove();
        }

        let n = 1;
        let win = true;
        let tiles = this.grid.tab;
        for (let tile of tiles) {
            // Vérifier si les identifiants des cases sont dans l'ordre
            if (tile.id != n) {
                win = false;
                break;
            }
            n = (n + 1) % (this.size * this.size);
        }
        // Si toutes les cases sont dans l'ordre, afficher un message de victoire
        if (win) {
            time.stop(); // Arrêter le chronomètre
            let block = document.getElementById('taquingrid'); // Sélectionner l'élément parent de la grille
            let winblock = document.createElement('div'); // Créer un élément div pour afficher le message de victoire
            let wintext = document.createElement('p'); // Créer un élément p pour le texte du message de victoire
            wintext.textContent = 'You Won !'; // Texte du message de victoire
            winblock.appendChild(wintext); // Ajouter le texte au bloc de victoire
            winblock.setAttribute('id', 'timerContainer'); // Ajouter un identifiant au bloc de victoire
            block.appendChild(winblock); // Ajouter le bloc de victoire à l'élément parent

            let input = document.createElement('input'); // Créer un élément input pour le nom d'utilisateur
            input.setAttribute('placeholder', 'Enter Your username'); // Placeholder de l'input
            input.setAttribute('type', 'text'); // Type de l'input
            input.setAttribute('id', 'userID'); // Identifiant de l'input
            input.setAttribute('class', 'button-30'); // Identifiant du bouton
            block.appendChild(input); // Ajouter l'input à l'élément parent

            let button = document.createElement('button'); // Créer un bouton pour soumettre le nom d'utilisateur
            button.setAttribute('id', 'saveBUT'); // Identifiant du bouton
            button.setAttribute('class', 'button-30'); // Identifiant du bouton
            button.textContent = 'Submit'; // Texte du bouton
            button.onclick = save; // Action à effectuer lors du clic sur le bouton
            block.appendChild(button); // Ajouter le bouton à l'élément parent
        }
    }
}
