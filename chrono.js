// Créer un élément div pour afficher le temps écoulé
let timerDisplay = document.createElement("div");
timerDisplay.id = "timer";

// Créer un élément div pour contenir le chronomètre
let timerContainer = document.createElement("div");
let chronotext = document.createElement('p');
timerContainer.appendChild(chronotext);
timerContainer.id = "timerContainer";

// Initialiser le texte du chronomètre à "Chrono : 0:0:00"
timerDisplay.innerText = "Chrono : 0:0:00 ";
timerContainer.appendChild(timerDisplay); // Ajouter l'élément div du chronomètre à son conteneur

// Sélectionner l'élément parent où afficher le chronomètre
let mainElement = document.getElementById('taquingrid');
mainElement.appendChild(timerContainer); // Ajouter le conteneur du chronomètre à l'élément parent

// Définir un objet "time" pour gérer le chronomètre
export let time = {
    // Propriétés pour stocker les valeurs du temps
    minutes: 0,
    secondes: 0,
    milliSecondes: 0,
    timer: null, // Propriété pour stocker l'identifiant du setInterval

    // Méthode pour mettre à jour l'affichage du chronomètre
    updateTime: function () {
        if (this.timer !== null) {
            timerDisplay.innerText = "Chrono : " + this.minutes + ":" + this.secondes + ":" + this.milliSecondes;
        }
    },

    // Méthode pour définir les valeurs du temps
    setTime: function (minutesValue, secondesValue, milliSecondesValue) {
        this.minutes = minutesValue;
        this.secondes = secondesValue;
        this.milliSecondes = milliSecondesValue;
    },

    // Méthode pour incrémenter le temps
    increaseTime: function () {
        this.milliSecondes++;
        if (this.milliSecondes > 99) {
            this.milliSecondes = 0;
            this.secondes++;
        }
        if (this.secondes > 59) {
            this.secondes = 0;
            this.minutes++;
        }
    },

    // Méthode pour démarrer le chronomètre
    start: function () {
        console.log("start");
        if (this.timer === null) {
            // Lancer le setInterval pour mettre à jour le temps toutes les 10 millisecondes
            this.timer = setInterval(() => {
                this.increaseTime();
                this.updateTime();
            }, 10);
        }
    },

    // Méthode pour arrêter le chronomètre
    stop: function () {
        if (this.timer !== null) {
            // Arrêter le setInterval
            clearInterval(this.timer);
            this.timer = null;
            console.log("stop");
        }
    },

    // Méthode pour initialiser le chronomètre
    initialTimer: function () {
        this.setTime(0, 0, 0); // Initialiser les valeurs du temps à zéro
        this.updateTime(); // Mettre à jour l'affichage du chronomètre
    }
}

// Initialiser le chronomètre au chargement de la page
time.initialTimer();
time.updateTime(); // Mettre à jour l'affichage du chronomètre
