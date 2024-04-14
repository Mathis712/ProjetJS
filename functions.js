import { Taquin } from "./taquin.js"; // Importer la classe Taquin depuis un autre fichier
import { time } from "./chrono.js"; // Importer la fonction time depuis un autre fichier

// Définir une fonction reset avec deux paramètres: size (taille du taquin) et mode (mode de jeu)
export function reset(size, mode) {

    // Sélectionner l'élément parent du taquin dans le DOM
    var parentElement = document.getElementById("taquingrid");
    // Compter le nombre d'éléments enfants dans l'élément parent
    var count = parentElement.childElementCount;
    // Vérifier s'il y a déjà des éléments enfants (grille de jeu) dans l'élément parent
    if (count == 5) { // Si la grille est déjà affichée (5 éléments enfants)
        // Supprimer les trois derniers éléments enfants (la grille de jeu)
        for (let i = 0; i < 3; i++) {
            var lastChild = parentElement.lastElementChild;
            parentElement.removeChild(lastChild);
        }
    }

    // Arrêter le chronomètre
    time.stop();
    // Réinitialiser le chronomètre
    time.initialTimer();
    
    // Créer une nouvelle instance de la classe Taquin avec la taille et le mode spécifiés
    let taquin = new Taquin(size, mode);
    // Mettre à jour le taquin avec le mode de jeu spécifié
    taquin.update(mode);

    // Déclaration de la variable victoryMessage
    let victoryMessage;
    // Vérifier si l'élément avec l'identifiant "victoryMessageContainer" existe
    victoryMessage = document.getElementById("victoryMessageContainer");
    if (victoryMessage == undefined) { // Si l'élément n'existe pas
        // Créer un nouvel élément div pour afficher le message de victoire
        victoryMessage = document.createElement("div");
    } else { // Si l'élément existe
        // Supprimer l'élément pour éviter les doublons
        victoryMessage.remove();
    }
}
