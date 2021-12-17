"use strict";
window.addEventListener("load", function () {
    /*
               _   _ _____ __  __      _    _          _   _ _____
         /\   | \ | |_   _|  \/  |    | |  | |   /\   | \ | |  __ \
        /  \  |  \| | | | | \  / |    | |__| |  /  \  |  \| | |  | |
       / /\ \ | . ` | | | | |\/| |    |  __  | / /\ \ | . ` | |  | |
      / ____ \| |\  |_| |_| |  | |    | |  | |/ ____ \| |\  | |__| |
     /_/    \_\_| \_|_____|_|  |_|    |_|  |_/_/    \_\_| \_|_____/
                                                                    
                                                                    
    */
    // DO NOT CALL THIS FUNCTION
    function toggleHand(classElmt) {
        classElmt.src = (classElmt.src == "../assets/img/mainFermee.png") ? "../assets/img/mainOuverte.png" : "../assets/img/mainFermee.png";
    }
    // HIDE HAND
    function hideHand(classElmt) {
        var element = document.querySelector(`img.${classElmt}`); // i defined my element
        var posHand = element.getBoundingClientRect(); // i defined my hand coordinates
        if (classElmt == "handLeft") {
            if (posHand.right > 0) {
                var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left')) - 10;
                element.style.marginLeft = newPos + "px";
            }
            else {
                clearInterval(interval);
                showHand(classElmt, true); // SHOW AGAIN THE HAND
            }
        }
        else {
            if (posHand.left < window.screen.width) {
                var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) - 10;
                element.style.marginRight = newPos + "px";
            }
            else {
                clearInterval(interval);
                showHand(classElmt, true); // SHOW AGAIN THE HAND
            }
        }
    }
    // DO NOT CALL THIS FUNCTION
    function showHand(classElmt, changeHand) {
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
                }
            }
            else {
                console.log(posHand.right > window.screen.width - 10);
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
            console.log(hiddenMarbles);
            hiddenMarbles.forEach(function (bille) {
                console.log("ok 1");
                if (parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) <= 0.9) {
                    console.log("ok 2");
                    bille.style.opacity = parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) + 0.1;
                }
                else {
                    clearInterval(intervalDisplayM);
                }
            });
        }, 50);
    }
    removeMarbles("barUser2", 3);
    var interval = window.setInterval(function () { hideHand("handRight"); }, 25); // HIDE HAND
});
