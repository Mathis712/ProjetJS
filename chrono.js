// Code HTML pour afficher le temps écoulé
let timerDisplay = document.createElement("div");
timerDisplay.id = "timer";

let timerContainer = document.createElement("div");
let chronotext = document.createElement('p');
timerContainer.appendChild(chronotext);
timerContainer.id = "timerContainer";
timerDisplay.innerText = "Chrono : 0:0:00 ";
timerContainer.appendChild(timerDisplay);

let mainElement = document.getElementById('taquingrid');
// let mainElement = document.querySelector('main');
mainElement.appendChild(timerContainer);



export let time = {   
    minutes: 0,
    secondes: 0,
    milliSecondes: 0,
    timer: null,

    updateTime: function () {
        if (this.timer !== null) {
            timerContainer.id = "timerContainer";

            timerDisplay.innerText = "Chrono : " + this.minutes + ":" + this.secondes + ":" + this.milliSecondes;
        }
    },

    setTime: function (minutesValue, secondesValue, milliSecondesValue) {
        this.minutes = minutesValue;
        this.secondes = secondesValue;
        this.milliSecondes = milliSecondesValue;
    },

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

    start: function () {
        console.log("start");

        if (this.timer === null) {
            this.timer = setInterval(() => {
                this.increaseTime();
                this.updateTime();
            }, 10);
        }
    },

    stop: function () {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
            console.log("stop");
        }
    },

    initialTimer: function () {
        this.setTime(0, 0, 0);
        this.updateTime();
        
    }

}

time.initialTimer();
time.updateTime();


