import { Taquin } from "./taquin.js";
import { time } from "./chrono.js";

export function reset(size, mode) {

    // Sélectionner l'élément parent
    var parentElement = document.getElementById("taquingrid");
    var count = parentElement.childElementCount;
    if (count == 5) {
        for (let i = 0; i < 3; i++) {
            var lastChild = parentElement.lastElementChild;
            parentElement.removeChild(lastChild);
        }
    }

    time.stop();
    time.initialTimer();
    let taquin = new Taquin(size, mode);
    taquin.update(mode);
    let victoryMessage;
    victoryMessage = document.getElementById("victoryMessageContainer");
    if (victoryMessage == undefined) {
        victoryMessage = document.createElement("div");

    } else {
        victoryMessage.remove();
    }

}
