"use strict";
let playerTurn = true;
let gameEnded = false;
let pairButton = document.querySelector(".pairButton");
let impairButton = document.querySelector(".impairButton");
let validateButton = document.querySelector(".validateButton");
let inputMarble = document.querySelector("#marbleChallenger");
let invalidChars = ["-", "+", "e", ".", ","];
class Player {
    constructor(name, hand, marbleInBag, isAI) {
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
                return console.log(this.name + " est mort");
            }
            else {
                return console.log(this.name + " est vivant");
            }
        };
        this.name = name;
        this.hand = hand;
        this.marbleInBag = marbleInBag;
        this.isAI = isAI;
    }
}
let Challenger = new Player("Challenger", 0, 10, false);
let Adversaire = new Player("Adversaire", 0, 10, true);
function TransferMarble(Giver, Receiver) {
    if (Giver.marbleInBag < Receiver.hand) {
        Receiver.marbleInBag += Giver.marbleInBag;
        Giver.marbleInBag = 0;
    }
    else {
        Receiver.marbleInBag += Receiver.hand;
        Giver.marbleInBag -= Receiver.hand;
    }
    Giver.CheckDeath();
    Receiver.CheckDeath();
    inputMarble.max = Challenger.marbleInBag.toString();
    inputMarble.value = "1";
    inputMarble.disabled = false;
    validateButton.disabled = false;
    pairButton.disabled = true;
    impairButton.disabled = true;
    console.log("After Transfer(Challenger) : " + Challenger.marbleInBag + " et dans la main " + Challenger.hand);
    console.log("After Transfer(Adversaire) : " + Adversaire.marbleInBag + " et dans la main " + Adversaire.hand);
    Challenger.hand = 0;
    Adversaire.hand = 0;
}
function CompareMarbleInHand(Challenger, Adversaire, choice) {
    if (Challenger.hand == 0 || Adversaire.hand == 0) {
        return console.log("Veuillez mettre des billes dans votre main");
    }
    else {
        if (Challenger.isAI) {
            choice = Math.floor(Math.random() * 2);
        }
        if (Adversaire.hand % 2 == 0 && choice == 0) {
            TransferMarble(Adversaire, Challenger);
            playerTurn = !playerTurn;
            return console.log(Challenger.name + " a gagné");
        }
        else if (Adversaire.hand % 2 != 0 && choice == 1) {
            TransferMarble(Adversaire, Challenger);
            playerTurn = !playerTurn;
            return console.log(Challenger.name + " a gagné");
        }
        else {
            TransferMarble(Challenger, Adversaire);
            playerTurn = !playerTurn;
            return console.log(Challenger.name + " a perdu");
        }
    }
}
function putMarbleInHand() {
    if (!gameEnded) {
        Challenger.ChoseNumberOfMarbleInHand(Number(inputMarble.value));
        Adversaire.ChoseNumberOfMarbleInHand(Math.floor(Math.random() * Adversaire.marbleInBag) + 1);
        pairButton.disabled = false;
        impairButton.disabled = false;
        validateButton.disabled = true;
        inputMarble.disabled = true;
        if (!playerTurn) {
            CompareMarbleInHand(Adversaire, Challenger, 0);
        }
    }
    else {
        pairButton.disabled = true;
        impairButton.disabled = true;
        validateButton.disabled = true;
    }
}
function MinMaxValueInInput(nb) {
    if (nb.value != "") {
        if (parseInt(nb.value) < parseInt(nb.min)) {
            nb.value = nb.min;
            return console.log("Vous ne pouvez pas mettre moins de " + nb.min + " billes");
        }
        if (parseInt(nb.value) > parseInt(nb.max)) {
            nb.value = nb.max;
            return console.log("Vous ne pouvez pas mettre plus de " + nb.max + " billes");
        }
    }
}
function InitFunctionInDom() {
    inputMarble.addEventListener("input", () => { MinMaxValueInInput(inputMarble); });
    pairButton.addEventListener("click", () => { CompareMarbleInHand(Challenger, Adversaire, 0); });
    impairButton.addEventListener("click", () => { CompareMarbleInHand(Challenger, Adversaire, 1); });
    validateButton.addEventListener("click", () => { putMarbleInHand(); });
    inputMarble.addEventListener("keydown", function (e) { if (invalidChars.includes(e.key)) {
        e.preventDefault();
    } });
}
InitFunctionInDom();
