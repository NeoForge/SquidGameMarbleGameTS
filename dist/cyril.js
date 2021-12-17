"use strict";
window.addEventListener("load", function () {
    const inputNumber = document.querySelector("input[type=number]");
    const inputEven = document.querySelector("input.even");
    const inputOdd = document.querySelector("input.odd");
    const handLeft = document.querySelector("img.handLeft");
    const handRight = document.querySelector("img.handRight");
    /*
       _____ ______ _____ _    _ _____  _____ _________     __
      / ____|  ____/ ____| |  | |  __ \|_   _|__   __\ \   / /
     | (___ | |__ | |    | |  | | |__) | | |    | |   \ \_/ /
      \___ \|  __|| |    | |  | |  _  /  | |    | |    \   /
      ____) | |___| |____| |__| | | \ \ _| |_   | |     | |
     |_____/|______\_____|\____/|_|  \_\_____|  |_|     |_|
                                                              
                                                              
    */
    /* ACTION ON INPUT NUMBER */
    inputNumber.addEventListener("input", function (evt) {
        if (parseInt(inputNumber.value) < inputNumber.getAttribute("min") || parseInt(inputNumber.value) > inputNumber.getAttribute("max")) {
            alert(`Value between ${inputNumber.getAttribute("min")} and ${inputNumber.getAttribute("max")} expected bro'.`);
            inputNumber.value = "";
        }
    });
    /*
               _   _ _____ __  __      _    _          _   _ _____
         /\   | \ | |_   _|  \/  |    | |  | |   /\   | \ | |  __ \
        /  \  |  \| | | | | \  / |    | |__| |  /  \  |  \| | |  | |
       / /\ \ | . ` | | | | |\/| |    |  __  | / /\ \ | . ` | |  | |
      / ____ \| |\  |_| |_| |  | |    | |  | |/ ____ \| |\  | |__| |
     /_/    \_\_| \_|_____|_|  |_|    |_|  |_/_/    \_\_| \_|_____/
                                                                    
                                                                    
    */
    // CHANGE PICTURES HANDS
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
                interval = window.setInterval(() => { showHand(classElmt, true); }, 50); // SHOW AGAIN THE HAND
            }
        }
        else {
            if (posHand.left < window.screen.width) {
                var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) - 10;
                element.style.marginRight = newPos + "px";
            }
            else {
                clearInterval(interval);
                interval = window.setInterval(() => { showHand(classElmt, true); }, 50); // SHOW AGAIN THE HAND
            }
        }
    }
    // SHOW HAND
    function showHand(classElmt, changeHand) {
        var element = document.querySelector(`img.${classElmt}`); // i defined my element
        var posHand = element.getBoundingClientRect(); // i defined my hand coordinates
        if (changeHand) {
            toggleHand(element);
        }
        if (classElmt == "handLeft") {
            if (posHand.left < -120) {
                var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left')) + 10;
                element.style.marginLeft = newPos + "px";
            }
            else {
                console.log("done");
                clearInterval(interval);
            }
        }
        else {
            console.log(posHand.right > window.screen.width);
            if (posHand.right - parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) - 120 >= window.screen.width) {
                var newPos = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) + 10;
                element.style.marginRight = newPos + "px";
            }
            else {
                console.log("done");
                clearInterval(interval);
            }
        }
    }
    /*
               _   _ _____ __  __     ____ _____ _      _      ______  _____
         /\   | \ | |_   _|  \/  |   |  _ \_   _| |    | |    |  ____|/ ____|
        /  \  |  \| | | | | \  / |   | |_) || | | |    | |    | |__  | (___
       / /\ \ | . ` | | | | |\/| |   |  _ < | | | |    | |    |  __|  \___ \
      / ____ \| |\  |_| |_| |  | |   | |_) || |_| |____| |____| |____ ____) |
     /_/    \_\_| \_|_____|_|  |_|   |____/_____|______|______|______|_____/
                                                                             
                                                                             
    */
    function hideMarbles(barUserClass, nb) {
        var billeList = document.querySelectorAll(`div.${barUserClass} img:nth-last-child(-n+${nb})`);
        billeList.forEach(function (bille) {
            bille.style.cssText = "transform: rotate(360deg); transition:all 100ms ease-in-out;";
            bille.style.opacity = "0.9";
            var anim = setInterval(function () {
                if (parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) != 0) {
                    bille.style.opacity = parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) - 0.1;
                    console.log("-0.2");
                }
                if (parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity')) == 0) {
                    clearInterval(anim);
                }
            }, 50);
        });
    }
    hideMarbles("barUser1", 3);
    var interval = window.setInterval(function () { hideHand("handLeft"); }, 50); // HIDE HAND
});