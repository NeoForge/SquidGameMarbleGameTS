"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
let gameEnded = false;
class Player {
    constructor(name, hand, marbleInBag) {
        this.ChoseNumberOfMarbleInHand = (nb) => {
            if (nb <= this.marbleInBag) {
                this.hand = nb;
                return nb;
            }
            else {
                return console.log(this.name + " Vous n'avez pas assez de billes dans votre sac");
            }
        };
        this.CheckDeath = () => {
            if (this.marbleInBag <= 0) {
                gameEnded = true;
                return console.log("Vous êtes mort");
            }
            else {
                return console.log("Vous êtes vivant");
            }
        };
        this.name = name;
        this.hand = hand;
        this.marbleInBag = marbleInBag;
    }
}
exports.Player = Player;
