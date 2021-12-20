window.addEventListener("load", function(){
/*
           _   _ _____ __  __      _    _          _   _ _____  
     /\   | \ | |_   _|  \/  |    | |  | |   /\   | \ | |  __ \ 
    /  \  |  \| | | | | \  / |    | |__| |  /  \  |  \| | |  | |
   / /\ \ | . ` | | | | |\/| |    |  __  | / /\ \ | . ` | |  | |
  / ____ \| |\  |_| |_| |  | |    | |  | |/ ____ \| |\  | |__| |
 /_/    \_\_| \_|_____|_|  |_|    |_|  |_/_/    \_\_| \_|_____/ 
                                                                
                                                                
*/
    // DO NOT CALL THIS FUNCTION
    function toggleHand(classElmt:any):void{
        classElmt.src = (classElmt.src=="../assets/img/mainFermee.png") ? "../assets/img/mainOuverte.png" : "../assets/img/mainFermee.png";

        // hide count in the hand if the hand is close
        const handLeft:any = document.querySelector("img.handLeft");
        const handRight:any = document.querySelector("img.handRight");
        if(handLeft.src=="../assets/img/mainFermee.png"){
            handLeft.style.display = "none";
        }
        if(handRight.src=="../assets/img/mainFermee.png"){
            handLeft.style.display = "none";
        }
    }

    // HIDE HAND
    function hideHand(classElmt:any):void{
        var element:any = document.querySelector(`img.${classElmt}`); // i defined my element
        var posHand:any = element.getBoundingClientRect(); // i defined my hand coordinates


        if(classElmt=="handLeft"){

            if(posHand.right>0){
                var newPos:number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left')) - 10;
                element.style.marginLeft = newPos+"px";
            }else{
                clearInterval(interval);
                showHand(classElmt, true);  // SHOW AGAIN THE HAND
            }
        }else{
            if(posHand.left<window.screen.width){
                var newPos:number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) - 10;
                element.style.marginRight = newPos+"px";
            }else{
                clearInterval(interval);
                showHand(classElmt, true); // SHOW AGAIN THE HAND
            }
        }
    }

    // DO NOT CALL THIS FUNCTION
    function showHand(classElmt:any, changeHand:boolean):void{
        var element:any = document.querySelector(`img.${classElmt}`); // i defined my element
        if(changeHand){
            toggleHand(element);
        }

        var moveMax:number = Math.abs(parseInt(element.getBoundingClientRect().left))/10;

        interval = window.setInterval(()=>{
            var posHand:any = element.getBoundingClientRect(); // i defined my hand coordinates
            if(classElmt=="handLeft"){
                if(posHand.left<=-10){
                    var newPos:number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-left')) + 10;
                    element.style.marginLeft = newPos+"px";
                }else{
                    clearInterval(interval);
                }
            }else{
                console.log(posHand.right>window.screen.width-10);
                
                if(posHand.right-10>window.screen.width){
                    var newPos:number = parseInt(window.getComputedStyle(element).getPropertyValue('margin-right')) + 10;
                    element.style.marginRight = newPos+"px";
                }else{
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
    function removeMarbles(barUserClass:string,nb:number){
        if(barUserClass=="barUser2"){
            var billeList:any = document.querySelectorAll(`div.${barUserClass} img:nth-child(-n+${nb})`);
        }else{
            var billeList:any = document.querySelectorAll(`div.${barUserClass} img:nth-last-child(-n+${nb})`);
        }
        billeList.forEach(function (bille:any){
            bille.style.cssText="transform: rotate(360deg); transition:all 100ms ease-in-out;";
            bille.style.opacity = "0.9";
            var anim = setInterval(function(){
                if(parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity'))!=0){
                    bille.style.opacity = parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity'))-0.1;
                }
                if(parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity'))==0){
                    bille.remove();
                    addMarbles(barUserClass);
                    clearInterval(anim);
                }
            }, 50);
        });
    }

    // DO NOT CALL THIS FUNCTION
    function addMarbles(barUserClass:string){
        if(barUserClass=="barUser2"){
            var billeUser:any = document.querySelector(`div.${barUserClass} img:nth-last-child(-n+1)`); // i select last marble
            var node:any =  document.querySelector(`div.barUser1`);
            node.innerHTML += '<img class="billeUser hiddenMarbles" src="../assets/img/bille-1.png" style="opacity:0.1;transition:all 50ms ease-in-out;">';
        }else{
            var billeUser:any = document.querySelector(`div.${barUserClass} img:nth-child(n+1)`); // i select last marble
            var node:any =  document.querySelector(`div.barUser2`);
            node.innerHTML = '<img class="billeUser hiddenMarbles" src="../assets/img/bille-2.png" style="opacity:0.1;transition:all 50ms ease-in-out;">' + node.innerHTML;
        }
        var intervalDisplayM:any = setInterval(function(){ 
            var hiddenMarbles:any = document.querySelectorAll(".hiddenMarbles");
            console.log(hiddenMarbles);
            hiddenMarbles.forEach(function(bille:any){
                console.log("ok 1");
                if(parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity'))<=0.9){
                    console.log("ok 2");
                    bille.style.opacity = parseFloat(window.getComputedStyle(bille).getPropertyValue('opacity'))+0.1;
                }else{
                    clearInterval(intervalDisplayM);
                }
            });
        }, 50);
    }
    //                             L, F
    // displayMarblesNb(    array [3, 2]    );
    function displayMarblesNb(array:number[]){
        const handLeft:any = document.querySelector("img.handLeft");
        const handRight:any = document.querySelector("img.handRight");

        const cntLeft:any = document.querySelector("div.cntLeft");
        const cntRight:any = document.querySelector("div.cntRight");

        var marblesLeft = array[0];
        var marblesRight = array[1];

        var handPosLeft:any = handLeft.getBoundingClientRect();
        var handPosRight:any = handRight.getBoundingClientRect();

        var ctrHandLeft = (handPosLeft.right-handPosLeft.left)/3;
        var middleHandLeft = handPosLeft.top + ((handPosLeft.bottom-handPosLeft.top)/3);

        var ctrHandRight = (handPosRight.right-handPosRight.left)/2;
        var middleHandRight = handPosRight.top + ((handPosRight.bottom-handPosRight.top)/2);

        const cntBgLeft = "background: url('../assets/img/bille-1.png') no-repeat;background-size: contain;"
        const cntBgRight = "background: url('../assets/img/bille-2.png') no-repeat;background-size: contain;"

        cntLeft.style.cssText = `display:block;position:fixed;z-index:999;top:${middleHandLeft}px;left:${ctrHandLeft}px;color:#fff !important;font-size:48px;width: 128px; height: auto;padding-left: 14px;padding-bottom:3px;${cntBgLeft};`;
        cntRight.style.cssText = `display:block;position:fixed;z-index:999;top:${middleHandRight}px;right:${ctrHandRight}px;color:#fff !important;font-size:48px;width: 128px; height: auto;padding-left: 14px;padding-bottom:3px;${cntBgRight}`;

        cntLeft.innerHTML = marblesLeft;
        cntRight.innerHTML = marblesRight;
    }


    removeMarbles("barUser2",3);
    var interval:any = window.setInterval(function(){ hideHand("handRight") }, 25); // HIDE HAND

    var monTbl:number[] = [3, 2]; // handLeft, rightRight
    displayMarblesNb(monTbl);

});

