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

