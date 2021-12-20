









window.addEventListener("load", function () {




    let playerTurn = true;
    let gameEnded = false;
    let pairButton = document.querySelector(".even") as HTMLButtonElement;
    let impairButton = document.querySelector(".odd") as HTMLButtonElement;
    class Player {
        name: string;
        hand: number;
        marbleInBag: number;
        isAI: boolean;
        constructor(name: string, hand: number, marbleInBag: number, isAI: boolean) {
            this.name = name;
            this.hand = hand;
            this.marbleInBag = marbleInBag;
            this.isAI = isAI;
        }
    
        ChoseNumberOfMarbleInHand = (nb: number) => {
            if (nb <= this.marbleInBag) {
                this.hand = nb;
                return nb;
            }
            else {
                return console.log(this.name + " Vous n'avez pas assez de billes dans votre sac");
            }
        }
    
        CheckDeath = () => {
            if (this.marbleInBag <= 0) {
                gameEnded = true;
                return console.log(this.name + " est mort");
            }
            else {
                return console.log(this.name + " est vivant");
            }
        }
    }
    let Challenger = new Player("Challenger", 0, 10, false);
    let Adversaire = new Player("Adversaire", 0, 10, true);
    function TransferMarble(Giver: Player, Receiver: Player) {
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
        pairButton.disabled = true;
        impairButton.disabled = true;
        console.log("After Transfer(Challenger) : " + Challenger.marbleInBag + " et dans la main " + Challenger.hand);
        console.log("After Transfer(Adversaire) : " + Adversaire.marbleInBag + " et dans la main " + Adversaire.hand);
        Challenger.hand = 0;
        Adversaire.hand = 0;
    }
    function CompareMarbleInHand(Challenger: Player, Adversaire: Player, choice: number) {
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
    function putMarbleInHand(nb :number) {
    
        if (!gameEnded) {
            Challenger.ChoseNumberOfMarbleInHand(nb);
            Adversaire.ChoseNumberOfMarbleInHand(Math.floor(Math.random() * Adversaire.marbleInBag) + 1);
            pairButton.disabled = false;
            impairButton.disabled = false;
            if (!playerTurn) {
                CompareMarbleInHand(Adversaire, Challenger, 0);
            }
        }
        else {
            pairButton.disabled = true;
            impairButton.disabled = true;
        }
    }
    function InitFunctionInDom() {
        pairButton.addEventListener("click", () => {CompareMarbleInHand(Challenger, Adversaire, 0);});
        impairButton.addEventListener("click", () => {CompareMarbleInHand(Challenger, Adversaire, 1);});
    }
    InitFunctionInDom();
    








































































    /*
               _   _ _____ __  __      _    _          _   _ _____  
         /\   | \ | |_   _|  \/  |    | |  | |   /\   | \ | |  __ \ 
        /  \  |  \| | | | | \  / |    | |__| |  /  \  |  \| | |  | |
       / /\ \ | . ` | | | | |\/| |    |  __  | / /\ \ | . ` | |  | |
      / ____ \| |\  |_| |_| |  | |    | |  | |/ ____ \| |\  | |__| |
     /_/    \_\_| \_|_____|_|  |_|    |_|  |_/_/    \_\_| \_|_____/ 
                                                                    
                                                                    
    */
    // DO NOT CALL THIS FUNCTION
    function toggleHand(classElmt: any): void {
        classElmt.src = (classElmt.src == "../assets/img/mainFermee.png") ? "../assets/img/mainOuverte.png" : "../assets/img/mainFermee.png";
    }

    // HIDE HAND
    function hideHand(classElmt: any): void {
        var element: any = document.querySelector(`img.${classElmt}`); // i defined my element
        var posHand: any = element.getBoundingClientRect(); // i defined my hand coordinates


        if (classElmt == "handLeft") {

            if (posHand.right > 0) {
                var newPos: number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left')) - 10;
                element.style.marginLeft = newPos + "px";
            } else {
                clearInterval(interval);
                showHand(classElmt, true);  // SHOW AGAIN THE HAND
            }
        } else {
            if (posHand.left < window.screen.width) {
                var newPos: number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) - 10;
                element.style.marginRight = newPos + "px";
            } else {
                clearInterval(interval);
                showHand(classElmt, true); // SHOW AGAIN THE HAND
            }
        }
    }

    // DO NOT CALL THIS FUNCTION
    function showHand(classElmt: any, changeHand: boolean): void {
        var element: any = document.querySelector(`img.${classElmt}`); // i defined my element
        if (changeHand) {
            toggleHand(element);
        }

        var moveMax: number = Math.abs(parseInt(element.getBoundingClientRect().left)) / 10;

        interval = window.setInterval(() => {
            var posHand: any = element.getBoundingClientRect(); // i defined my hand coordinates
            if (classElmt == "handLeft") {
                if (posHand.left <= -10) {
                    var newPos: number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left')) + 10;
                    element.style.marginLeft = newPos + "px";
                } else {
                    clearInterval(interval);
                }
            } else {

                if (posHand.right - 10 > window.screen.width) {
                    var newPos: number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) + 10;
                    element.style.marginRight = newPos + "px";
                } else {
                    clearInterval(interval);
                }
            }
        }, 50);
    }


    /*
               _   _ _____ __  __     ____ _____ _      _      ______  _____ 
         /\   | \ | |_   _|  \/  |   |  _ \_   _| |    | |    |  ____|/ ____|
        /  \  |  \| | | | | \  / |   | |_) || | | |    | |    | |__  | (___  
       / /\ \ | . ` | | | | |\/| |   |  _ < | | | |    | |    |  __|  \___ \ 
      / ____ \| |\  |_| |_| |  | |   | |_) || |_| |____| |____| |____ ____) |
     /_/    \_\_| \_|_____|_|  |_|   |____/_____|______|______|______|_____/ 
                                                                             
                                                                             
    */
    function removeMarbles(barUserClass: string, nb: number) {
        if (barUserClass == "barUser2") {
            var billeList: any = document.querySelectorAll(`div.${barUserClass} img:nth-child(-n+${nb})`);
        } else {
            var billeList: any = document.querySelectorAll(`div.${barUserClass} img:nth-last-child(-n+${nb})`);
        }
        billeList.forEach(function (bille: any) {
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
                }
            }, 50);
        });
    }


    // DO NOT CALL THIS FUNCTION
    function addMarbles(barUserClass: string) {
        if (barUserClass == "barUser2") {
            var billeUser: any = document.querySelector(`div.${barUserClass} img:nth-last-child(-n+1)`); // i select last marble
            var node: any = document.querySelector(`div.barUser1`);
            node.innerHTML += '<img class="billeUser hiddenMarbles" src="../assets/img/bille-1.png" style="opacity:0.1;transition:all 50ms ease-in-out;">';
        } else {
            var billeUser: any = document.querySelector(`div.${barUserClass} img:nth-child(n+1)`); // i select last marble
            var node: any = document.querySelector(`div.barUser2`);
            node.innerHTML = '<img class="billeUser hiddenMarbles" src="../assets/img/bille-2.png" style="opacity:0.1;transition:all 50ms ease-in-out;">' + node.innerHTML;
        }
        var intervalDisplayM: any = setInterval(function () {
            var hiddenMarbles: any = document.querySelectorAll(".hiddenMarbles");
            hiddenMarbles.forEach(function (bille: any) {
                if (parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) <= 0.9) {
                    bille.style.opacity = parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) + 0.1;
                } else {
                    bille.classList.remove("hiddenMarbles");
                    clearInterval(intervalDisplayM);
                }
            });
        }, 50);
    }

    var interval: any ;//= window.setInterval(function () { hideHand("handRight") }, 25); // HIDE HAND

    function SelectNumberOfBille() {
        let arrayOfBillesUser1 = document.querySelectorAll(`div.barUser1 img`);
        for (let i = 0; i < arrayOfBillesUser1.length; i++) {
            arrayOfBillesUser1[i].addEventListener('click', function () {
                removeMarbles("barUser1", i + 1);
                putMarbleInHand(i+1);
            });
        }
        return null;

    }
    SelectNumberOfBille();

});

