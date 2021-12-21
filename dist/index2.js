"use strict";
window.addEventListener("load", function () {
});
let playerTurn = true;
let gameEnded = false;
let pairButton = document.querySelector(".even");
let impairButton = document.querySelector(".odd");
let interval1;
let interval2;
let canContinue = true;
let isGuessEvenOdd = false;
class Player {
    constructor(name, hand, marbleInBag, isAI, HPBar) {
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
                // end screen
                console.log(">>>>keep: " + document.querySelectorAll('div.barUser1 img').length + " VS " + document.querySelectorAll('div.barUser2 img').length);
                if (!this.isAI) {
                    console.log("j'ai perdu");
                    fullscreenM("loose");
                }
                else {
                    console.log("j'ai gagner");
                    fullscreenM("win");
                }
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
        this.HPBar = HPBar;
    }
}
let Challenger = new Player("Challenger", 0, 10, false, "barUser1");
let Adversaire = new Player("Adversaire", 0, 10, true, "barUser2");
function TransferMarble(Giver, Receiver) {
    if (Giver.marbleInBag < Receiver.hand) {
        removeMarbles(Giver.HPBar, Giver.marbleInBag);
        Receiver.marbleInBag += Giver.marbleInBag;
        Giver.marbleInBag = 0;
    }
    else {
        removeMarbles(Giver.HPBar, Receiver.hand);
        Receiver.marbleInBag += Receiver.hand;
        Giver.marbleInBag -= Receiver.hand;
    }
    Giver.CheckDeath();
    Receiver.CheckDeath();
    pairButton.disabled = true;
    impairButton.disabled = true;
    console.log("After Transfer(Challenger) : " + Challenger.marbleInBag + " et dans la main " + Challenger.hand);
    console.log("After Transfer(Adversaire) : " + Adversaire.marbleInBag + " et dans la main " + Adversaire.hand);
    Challenger.hand = 0;
    Adversaire.hand = 0;
}
let ChosenChal;
let ChosenEnemy;
let ChoseChoice;
function CompareMarbleInHand(Challenger, Adversaire, choice) {
    if (isGuessEvenOdd) {
        isGuessEvenOdd = false;
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
    else if (!isGuessEvenOdd && Challenger.hand > 0 && Adversaire.hand > 0) {
        console.log("On entre dans la boucle d'anim ");
        isGuessEvenOdd = true;
        ChosenChal = Challenger;
        ChosenEnemy = Adversaire;
        ChoseChoice = choice;
        canContinue = false;
        interval1 = window.setInterval(function () { hideHand("handRight", interval1); }, 25);
        interval2 = window.setInterval(function () { hideHand("handLeft", interval2); }, 25);
    }
}
function putMarbleInHand(nb) {
    if (!gameEnded && canContinue) {
        Challenger.ChoseNumberOfMarbleInHand(nb);
        Adversaire.ChoseNumberOfMarbleInHand(Math.floor(Math.random() * Adversaire.marbleInBag) + 1);
        pairButton.disabled = false;
        impairButton.disabled = false;
        interval1 = window.setInterval(function () { hideHand("handRight", interval1); }, 25);
        interval2 = window.setInterval(function () { hideHand("handLeft", interval2); }, 25);
        canContinue = false;
    }
    else {
        pairButton.disabled = true;
        impairButton.disabled = true;
    }
}
function InitFunctionInDom() {
    pairButton.addEventListener("click", () => { CompareMarbleInHand(Challenger, Adversaire, 0); });
    impairButton.addEventListener("click", () => { CompareMarbleInHand(Challenger, Adversaire, 1); });
}
InitFunctionInDom();
function closeFullscreen() {
    const fullscreen = document.querySelector(".fullscreen");
    fullscreen.style.display = "none";
}
function fullscreenM(value) {
    const fullscreen = document.querySelector(".fullscreen");
    const fullscreenC = document.querySelector(".fullscreen .content");
    fullscreen.style.display = "";
    if (value == "win") {
        fullscreenC.innerHTML = "<h1>Congratulation !</h1>";
        var folder = "congrates";
    }
    else {
        fullscreenC.innerHTML = "<h1>Game over bro' !</h1>";
        var folder = "looser";
    }
    const gif = ["usa", "russia", "kim"];
    const random = Math.floor(Math.random() * gif.length);
    const img = `<img src='../assets/img/${folder}/${gif[random]}.gif' /><br><button onclick="location.reload();">Restart</button>`;
    fullscreenC.innerHTML += img;
}
/*
           _   _ _____ __  __      _    _          _   _ _____
     /\   | \ | |_   _|  \/  |    | |  | |   /\   | \ | |  __ \
    /  \  |  \| | | | | \  / |    | |__| |  /  \  |  \| | |  | |
   / /\ \ | . ` | | | | |\/| |    |  __  | / /\ \ | . ` | |  | |
  / ____ \| |\  |_| |_| |  | |    | |  | |/ ____ \| |\  | |__| |
 /_/    \_\_| \_|_____|_|  |_|    |_|  |_/_/    \_\_| \_|_____/
                                                                
                                                                
*/
// DO NOT CALL THIS FUNCTION
// DO NOT CALL THIS FUNCTION
function toggleHand(classElmt) {
    console.log(classElmt.src.endsWith("mainFermee.png"));
    classElmt.src = (classElmt.src.endsWith("mainFermee.png") ? "../assets/img/mainOuverte.png" : "../assets/img/mainFermee.png");
}
// HIDE HAND
function hideHand(classElmt, interval) {
    var element = document.querySelector(`img.${classElmt}`); // i defined my element
    var posHand = element.getBoundingClientRect(); // i defined my hand coordinates
    HideDisplayMarbleNB();
    if (classElmt == "handLeft") {
        if (posHand.right > 0) {
            var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left')) - 10;
            element.style.marginLeft = newPos + "px";
        }
        else {
            clearInterval(interval);
            showHand(classElmt, true, interval); // SHOW AGAIN THE HAND
        }
    }
    else {
        if (posHand.left < window.screen.width) {
            var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) - 10;
            element.style.marginRight = newPos + "px";
        }
        else {
            clearInterval(interval);
            showHand(classElmt, true, interval); // SHOW AGAIN THE HAND
        }
    }
}
// DO NOT CALL THIS FUNCTION
function showHand(classElmt, changeHand, interval) {
    var element = document.querySelector(`img.${classElmt}`); // i defined my element
    if (changeHand) {
        toggleHand(element);
    }
    var moveMax = Math.abs(parseInt(element.getBoundingClientRect().left)) / 10;
    interval = window.setInterval(() => {
        var posHand = element.getBoundingClientRect(); // i defined my hand coordinates
        if (classElmt == "handLeft") {
            if (posHand.left <= -10) {
                var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left')) + 10;
                element.style.marginLeft = newPos + "px";
            }
            else {
                clearInterval(interval);
                console.log(interval);
                if (isGuessEvenOdd) {
                    displayMarblesNb([Challenger.hand, Adversaire.hand]);
                    CompareMarbleInHand(ChosenChal, ChosenEnemy, ChoseChoice);
                }
                canContinue = true;
            }
        }
        else {
            if (posHand.right - 10 > window.screen.width) {
                var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) + 10;
                element.style.marginRight = newPos + "px";
            }
            else {
                clearInterval(interval);
            }
        }
    }, 50);
}
function displayMarblesNb(array) {
    const handLeft = document.querySelector("img.handLeft");
    const handRight = document.querySelector("img.handRight");
    const cntLeft = document.querySelector("div.cntLeft");
    const cntRight = document.querySelector("div.cntRight");
    var marblesLeft = array[0];
    var marblesRight = array[1];
    var handPosLeft = handLeft.getBoundingClientRect();
    var handPosRight = handRight.getBoundingClientRect();
    var ctrHandLeft = (handPosLeft.right - handPosLeft.left) / 3;
    var middleHandLeft = handPosLeft.top + ((handPosLeft.bottom - handPosLeft.top) / 3);
    var ctrHandRight = (handPosRight.right - handPosRight.left) / 2;
    var middleHandRight = handPosRight.top + ((handPosRight.bottom - handPosRight.top) / 2);
    const cntBgLeft = "background: url('../assets/img/bille-1.png') no-repeat;background-size: contain;";
    const cntBgRight = "background: url('../assets/img/bille-2.png') no-repeat;background-size: contain;";
    cntLeft.style.cssText = `display:block;position:fixed;z-index:999;top:${middleHandLeft}px;left:${ctrHandLeft}px;color:#fff !important;font-size:48px;width: 128px; height: auto;padding-left: 14px;padding-bottom:3px;${cntBgLeft};`;
    cntRight.style.cssText = `display:block;position:fixed;z-index:999;top:${middleHandRight}px;right:${ctrHandRight}px;color:#fff !important;font-size:48px;width: 128px; height: auto;padding-left: 14px;padding-bottom:3px;${cntBgRight}`;
    cntLeft.innerHTML = marblesLeft;
    cntRight.innerHTML = marblesRight;
}
function HideDisplayMarbleNB() {
    const cntLeft = document.querySelector("div.cntLeft");
    const cntRight = document.querySelector("div.cntRight");
    cntLeft.style.display = "none";
    cntRight.style.display = "none";
}
/*
           _   _ _____ __  __     ____ _____ _      _      ______  _____
     /\   | \ | |_   _|  \/  |   |  _ \_   _| |    | |    |  ____|/ ____|
    /  \  |  \| | | | | \  / |   | |_) || | | |    | |    | |__  | (___
   / /\ \ | . ` | | | | |\/| |   |  _ < | | | |    | |    |  __|  \___ \
  / ____ \| |\  |_| |_| |  | |   | |_) || |_| |____| |____| |____ ____) |
 /_/    \_\_| \_|_____|_|  |_|   |____/_____|______|______|______|_____/
                                                                         
                                                                         
*/
function removeMarbles(barUserClass, nb) {
    if (barUserClass == "barUser2") {
        var billeList = document.querySelectorAll(`div.${barUserClass} img:nth-child(-n+${nb})`);
    }
    else {
        var billeList = document.querySelectorAll(`div.${barUserClass} img:nth-last-child(-n+${nb})`);
    }
    billeList.forEach(function (bille) {
        bille.style.cssText = "transform: rotate(360deg); transition:all 100ms ease-in-out;";
        bille.style.opacity = "0.9";
        var anim = setInterval(function () {
            if (parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) != 0) {
                bille.style.opacity = parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) - 0.1;
            }
            if (parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) == 0) {
                bille.remove();
                addMarbles(barUserClass);
                clearInterval(anim);
                SelectNumberOfBille();
            }
        }, 50);
    });
}
// DO NOT CALL THIS FUNCTION
function addMarbles(barUserClass) {
    if (barUserClass == "barUser2") {
        var billeUser = document.querySelector(`div.${barUserClass} img:nth-last-child(-n+1)`); // i select last marble
        var node = document.querySelector(`div.barUser1`);
        node.innerHTML += '<img class="billeUser hiddenMarbles" src="../assets/img/bille-1.png" style="opacity:0.1;transition:all 50ms ease-in-out;">';
    }
    else {
        var billeUser = document.querySelector(`div.${barUserClass} img:nth-child(n+1)`); // i select last marble
        var node = document.querySelector(`div.barUser2`);
        node.innerHTML = '<img class="billeUser hiddenMarbles" src="../assets/img/bille-2.png" style="opacity:0.1;transition:all 50ms ease-in-out;">' + node.innerHTML;
    }
    var intervalDisplayM = setInterval(function () {
        var hiddenMarbles = document.querySelectorAll(".hiddenMarbles");
        hiddenMarbles.forEach(function (bille) {
            if (parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) <= 0.9) {
                bille.style.opacity = parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) + 0.1;
            }
            else {
                bille.classList.remove("hiddenMarbles");
                clearInterval(intervalDisplayM);
            }
        });
    }, 50);
}
// = window.setInterval(function () { hideHand("handRight") }, 25); // HIDE HAND
function SelectNumberOfBille() {
    let arrayOfBillesUser1 = document.querySelectorAll(`div.barUser1 img`);
    for (let i = 0; i < arrayOfBillesUser1.length; i++) {
        arrayOfBillesUser1[i].removeEventListener('click', () => { ClickBilleOnUserBar; });
    }
    for (let i = 0; i < arrayOfBillesUser1.length; i++) {
        arrayOfBillesUser1[i].addEventListener('click', () => { ClickBilleOnUserBar(i + 1); });
    }
    return null;
}
function ClickBilleOnUserBar(nb) {
    //removeMarbles("barUser1",nb);
    putMarbleInHand(nb);
}
SelectNumberOfBille();
function CheckGameState() {
    if (!canContinue) {
        pairButton.disabled = true;
        impairButton.disabled = true;
    }
    else {
        if (!playerTurn) {
            CompareMarbleInHand(Adversaire, Challenger, 0);
        }
        pairButton.disabled = false;
        impairButton.disabled = false;
    }
}
let intervalGameState = window.setInterval(function () { CheckGameState(); }, 100);
