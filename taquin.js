import { time } from "./chrono.js";
export class Tile {
    constructor(coordX, coordY, value, color, image) {
        this.coord = [coordX, coordY];
        this.value = value;
        this.color = color;
        this.image = image;
    }
}

export class Grid {
    constructor(size) {
        this.size = size;
        this.tab = [];
        this.id = "content3x3";
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

export class Taquin {
    constructor(size, mode) {
        this.size = size;


        let grid = new Grid(size);


        let myGrid = document.createElement("div");
        myGrid.id = grid.id;

        let n = 1;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let myTile = document.createElement("div");
                let tile = new Tile(i, j, n, null, null);
                if (n !== 0) {
                    myTile.innerText = n;
                }
                myTile.id = `cell-${tile.value}`;
                myTile.className = "cell";
                myTile.addEventListener('click', function () {

                    time.start();
                    this.move(tile, mode);

                    this.detectWin();
                }.bind(this));
                grid.tab.push(tile);
                myGrid.appendChild(myTile);
                n = (n + 1) % (size * size);
            }
        }

        this.grid = grid;
        this.div = myGrid;

        let mainElement = document.querySelector('main');

        let gridContainer = document.getElementById("gridContainer");
        gridContainer.innerHTML = '';
        gridContainer.appendChild(myGrid);
        mainElement.appendChild(gridContainer);

        this.shuffle();

    }

    update(mode) {

        let gridContainer = document.getElementById("gridContainer");
        gridContainer.innerHTML = '';
        gridContainer.appendChild(this.div);
        if (mode === "withoutNumbers") {
            let gridTiles = document.getElementsByClassName('cell');
            for (let tile of gridTiles) {
                tile.innerText = '';
            }
        }

    }



    move(tileToMove, mode) {

        for (let i = 0; i < this.grid.tab.length; i++) {
            let tile = this.grid.tab[i];

            if ((tile.value === 0 && tileToMove.coord[0] === tile.coord[0] && tileToMove.coord[1] === tile.coord[1] + 1)
                || (tile.value === 0 && tileToMove.coord[0] === tile.coord[0] && tileToMove.coord[1] === tile.coord[1] - 1)
                || (tile.value === 0 && tileToMove.coord[0] === tile.coord[0] + 1 && tileToMove.coord[1] === tile.coord[1])
                || (tile.value === 0 && tileToMove.coord[0] === tile.coord[0] - 1 && tileToMove.coord[1] === tile.coord[1])
            ) {


                // Échange des valeur
                let tempValue = tile.value;
                tile.value = tileToMove.value;
                tileToMove.value = tempValue;

                // Échange des div dans this.div
                let cell1 = document.getElementById(`cell-${tile.value}`);
                let cell2 = document.getElementById(`cell-${tileToMove.value}`);
                cell1.id = `cell-${tileToMove.value}`;
                cell2.id = `cell-${tile.value}`;

                // Mise à jour du texte des div
                cell1.innerText = tileToMove.value === 0 ? '' : tileToMove.value;
                cell2.innerText = tile.value === 0 ? '' : tile.value;


                this.update(mode);
                break; // Sort de la boucle dès que la permutation est effectuée
            }
        }

    }

    shuffle() {

        const numMoves = 10000; // Nombre de mouvements aléatoires
        let n = 0;
        while (n < numMoves) {


            const tileToMoveX = Math.floor(Math.random() * this.size); // 0: haut, 1: bas, 2: gauche, 3: droite
            const tileToMoveY = Math.floor(Math.random() * this.size); // 0: haut, 1: bas, 2: gauche, 3: droite


            for (let i = 0; i < this.grid.tab.length; i++) {

                if (this.grid.tab[i].coord[0] === tileToMoveX && this.grid.tab[i].coord[1] === tileToMoveY) {
                    this.move(this.grid.tab[i]);
                }
            }
            n++;
        }
    }

    detectWin() {
        let n = 1;
        let win = true;

        let divs = this.div.childNodes
        for (let tile of divs) {

            if (tile.innerText != n) {
                win = false;
                break;
            }
            n = (n + 1) % (this.size * this.size);
        }
        if (win) {
            console.log("win");
            time.stop();
            let victoryMessage = document.createElement("div");
            victoryMessage.innerHTML = "<div class=\"timerContainer\">C'est gagné !</div>";
            let mainElement = document.querySelector('main');
            mainElement.appendChild(victoryMessage);
        }
    }

}
