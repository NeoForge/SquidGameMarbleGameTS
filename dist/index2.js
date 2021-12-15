"use strict";
//SQUID GAME
//Règlements :
// 2 joueur , chaque joueur posséde un sac avec 10 billes , avant de débuter chaque joueur prend un nombre de billes  entre 1 et 10. Ensuite un challenger doit deviner si le nombre de billes dans la main de son adversaire est pair ou impair , si il a raison alors il prend le même nombre de bille qu'il a dans la main a son adversaire . Si il perd l'adversaire prend l'équivalent du nombre qu'il a dans la main au challenger.
class Player {
    constructor(name, hand, marbleInBag) {
        this.ChoseNumberOfMarbleInHand = (nb) => {
            if (nb > this.marbleInBag) {
                this.hand = nb;
                return nb;
            }
            else {
                return console.log("Vous n'avez pas assez de billes dans votre sac");
            }
        };
        this.CheckDeath = () => {
            if (this.marbleInBag <= 0) {
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
}
function CompareMarbleInHand(Challenger, Adversaire, choice) {
    if (choice == "pair") {
        if (Adversaire.hand % 2 == 0) {
            TransferMarble(Challenger, Adversaire);
            return console.log("Vous avez gagné");
        }
        else {
            TransferMarble(Adversaire, Challenger);
            return console.log("Vous avez perdu");
        }
    }
    else {
        if (Adversaire.hand % 2 != 0) {
            TransferMarble(Challenger, Adversaire);
            return console.log("Vous avez gagné");
        }
        else {
            TransferMarble(Adversaire, Challenger);
            return console.log("Vous avez perdu");
        }
    }
}
