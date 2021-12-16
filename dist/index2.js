"use strict";
//SQUID GAME
//Règlements :
// 2 joueur , chaque joueur posséde un sac avec 10 billes , avant de débuter chaque joueur prend un nombre de billes  entre 1 et 10. Ensuite un challenger doit deviner si le nombre de billes dans la main de son adversaire est pair ou impair , si il a raison alors il prend le même nombre de bille qu'il a dans la main a son adversaire . Si il perd l'adversaire prend l'équivalent du nombre qu'il a dans la main au challenger.
let playerTurn = true;
let inputMarble;
let gameEnded = false;
class Player {
    constructor(name, hand, marbleInBag) {
        this.ChoseNumberOfMarbleInHand = (nb) => {
            if (nb < this.marbleInBag) {
                this.hand = nb;
                return nb;
            }
            else {
                return console.log(this.name + " Vous n'avez pas assez de billes dans votre sac");
            }
        };
        this.CheckDeath = () => {
            if (this.marbleInBag <= 0) {
                return console.log("Vous êtes mort");
                gameEnded = true;
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
let Challenger = new Player("Challenger", 0, 10);
let Adversaire = new Player("Adversaire", 0, 10);
function TransferMarble(Giver, Receiver) {
    if (Giver.marbleInBag < Receiver.hand) {
        Receiver.marbleInBag += Giver.marbleInBag;
        Giver.marbleInBag = 0;
        Giver.CheckDeath();
    }
    else {
        Receiver.marbleInBag += Receiver.hand;
        Giver.marbleInBag -= Receiver.hand;
        Giver.CheckDeath();
    }
    Giver.CheckDeath();
    Receiver.CheckDeath();
    inputMarble.max = Challenger.marbleInBag;
    console.log("After Transfer(Challenger) : " + Challenger.marbleInBag + " et dans la main " + Challenger.hand);
    console.log("After Transfer(Adversaire) : " + Adversaire.marbleInBag + " et dans la main " + Adversaire.hand);
}
function CompareMarbleInHand(Challenger, Adversaire, choice) {
    if (Challenger.hand == 0 || Adversaire.hand == 0) {
        return console.log("Veuillez mettre des billes dans votre main");
    }
    else {
        if (playerTurn) {
            console.log("Le Joueur a guess : " + choice);
            if (choice == "pair") {
                if (Adversaire.hand % 2 == 0) {
                    TransferMarble(Adversaire, Challenger);
                    playerTurn = false;
                    return console.log("Vous avez gagné");
                }
                else {
                    TransferMarble(Challenger, Adversaire);
                    playerTurn = false;
                    return console.log("Vous avez perdu");
                }
            }
            else {
                if (Adversaire.hand % 2 != 0) {
                    TransferMarble(Adversaire, Challenger);
                    playerTurn = false;
                    return console.log("Vous avez gagné");
                }
                else {
                    TransferMarble(Challenger, Adversaire);
                    playerTurn = false;
                    return console.log("Vous avez perdu");
                }
            }
        }
        else {
            let rnd = Math.floor(Math.random() * 2);
            console.log("L'adversaire a guess : " + rnd);
            if (rnd == 0) {
                if (Adversaire.hand % 2 == 0) {
                    playerTurn = true;
                    TransferMarble(Challenger, Adversaire);
                    return console.log("l'adversaire a gagné");
                }
                else {
                    playerTurn = true;
                    TransferMarble(Adversaire, Challenger);
                    return console.log("l'adversaire a perdu");
                }
            }
            else {
                if (Adversaire.hand % 2 != 0) {
                    TransferMarble(Challenger, Adversaire);
                    playerTurn = true;
                    return console.log("l'adversaire a gagné");
                }
                else {
                    TransferMarble(Adversaire, Challenger);
                    playerTurn = true;
                    return console.log("l'adversaire a perdu");
                }
            }
        }
    }
}
//Select the number of Marble in hand
function putMarbleInHand() {
    if (!gameEnded) {
        Challenger.ChoseNumberOfMarbleInHand(Number(inputMarble.value));
        Adversaire.ChoseNumberOfMarbleInHand(Math.floor(Math.random() * Adversaire.marbleInBag) + 1);
    }
    else {
        console.log("La partie est terminée");
    }
}
//Create HTML DOM
CreatePairAndImpairButtonInBody();
function CreatePairAndImpairButtonInBody() {
    let body = document.querySelector("body");
    let pairButton = document.createElement("button");
    let impairButton = document.createElement("button");
    let ValidateButton = document.createElement("button");
    inputMarble = document.createElement("input");
    ValidateButton.innerHTML = "Valider";
    impairButton.innerHTML = "impair";
    pairButton.innerHTML = "pair";
    inputMarble.setAttribute("type", "number");
    inputMarble.id = "marbleChallenger";
    inputMarble.value = 1;
    inputMarble.min = 1;
    inputMarble.max = Challenger.marbleInBag;
    pairButton.addEventListener("click", () => { CompareMarbleInHand(Challenger, Adversaire, "pair"); });
    impairButton.addEventListener("click", () => { CompareMarbleInHand(Challenger, Adversaire, "impair"); });
    ValidateButton.addEventListener("click", () => { putMarbleInHand(); });
    body.appendChild(inputMarble);
    body.appendChild(ValidateButton);
    body.appendChild(pairButton);
    body.appendChild(impairButton);
}
