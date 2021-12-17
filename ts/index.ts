//SQUID GAME
//Règlements :
// 2 joueur , chaque joueur posséde un sac avec 10 billes , avant de débuter chaque joueur prend un nombre de billes  entre 1 et 10. Ensuite un challenger doit deviner si le nombre de billes dans la main de son adversaire est pair ou il prend le même nombre de bille qu'impair , si il a raison alors il a dans la main a son adversaire . Si il perd l'adversaire prend l'équivalent du nombre qu'il a dans la main au challenger.

class joueur {

  name: string;
  marbleInHand: number;
  marbleBag: number;

  constructor(name: string, marbleInHand: number, marbleBag: number) {
    this.name = name;
    this.marbleInHand = marbleInHand;
    this.marbleBag = marbleBag;
  }
}

let challengeur = new joueur("chall", 0, 10);
let ordinateur = new joueur("adv", 0, 10);
let aQuiLeTour = true;

function choixDuNombreDeBilles() {
  if (challengeur.marbleBag < 20 ) {
    let nb: any; 
    nb = prompt("combien tu mets frero", "1");
  

    if (nb == challengeur.marbleBag) {
      challengeur.marbleInHand = parseInt(nb);
      console.log("t'as toutes tes billes dans la main POGGER")
    }
    else if (nb > challengeur.marbleBag) {
      
     choixDuNombreDeBilles() ; 
     return console.log("t'as les yeux plus gros que le ventre")
    }
    else if( nb < 0 || nb == 0){
      console.log("il faut parier quelquechose ... ")
      choixDuNombreDeBilles() ; 
      return 
    }
    else
    {
      challengeur.marbleInHand = parseInt(nb);
    }
  }
  if (ordinateur.marbleBag === 20) {
    console.log("c'est rapé frero t'es perdu à tout jamais");
  }
  console.log("t'as " + challengeur.marbleInHand + " billes dans la main")
  return 
}

function ordinateurBillesSetup() {

  ordinateur.marbleInHand = Math.floor(Math.random() * ordinateur.marbleBag) + 1;
  console.log("ton adversaire à  " + ordinateur.marbleInHand + " billes dans la main")
  return
}


function reponseNombreDeBilles() {

  let reponseChallengeur: any;
  reponseChallengeur = prompt("Tu pense qu'il a un nombre de billes paire ou impaire dans la main ?");


  if (ordinateur.marbleInHand % 2 == 0 && reponseChallengeur == "paire") {
    challengeur.marbleBag += challengeur.marbleInHand;
    ordinateur.marbleBag -= challengeur.marbleInHand;
    aQuiLeTour = false;
    return console.log(" ggwp !")

  }
  else if(ordinateur.marbleInHand % 2 != 0 && reponseChallengeur == "impaire")
  {
    challengeur.marbleBag += challengeur.marbleInHand;
    ordinateur.marbleBag -= challengeur.marbleInHand;
    aQuiLeTour = false;
    return console.log(" ggwp !")
  }
  else
   {
    challengeur.marbleBag -= ordinateur.marbleInHand;
    ordinateur.marbleBag += ordinateur.marbleInHand;
    aQuiLeTour = false;
    return console.log("t'as perdu") ; 
  }
}

function ordinateurReponseNombreDeBilles() {
  let reponseOrdinateur = Math.floor(Math.random() * 2);


  if (challengeur.marbleInHand % 2 == 0 && reponseOrdinateur == 0) {
    ordinateur.marbleBag += ordinateur.marbleInHand;
    challengeur.marbleBag -= ordinateur.marbleInHand;
    aQuiLeTour = true;
    return console.log(" ggwp !")
  }
  
  else if (challengeur.marbleInHand % 2 != 0 && reponseOrdinateur == 1) {
    ordinateur.marbleBag += ordinateur.marbleInHand;
    challengeur.marbleBag -= ordinateur.marbleInHand;
    aQuiLeTour = true;
    return console.log(" ggwp !")
  }
  else {
    challengeur.marbleBag += challengeur.marbleInHand;
    ordinateur.marbleBag -= challengeur.marbleInHand;
    aQuiLeTour = true;
    return console.log("t'as perdu") ; 
  }
}



function gameLoop() {
  choixDuNombreDeBilles();
  ordinateurBillesSetup();
  if (aQuiLeTour) {
    reponseNombreDeBilles();
  }
  else if(!aQuiLeTour) {
    ordinateurReponseNombreDeBilles()
  }
  challengeur.marbleInHand=0;
  ordinateur.marbleInHand=0;
  console.log(challengeur);
  console.log(ordinateur);
  
  if(challengeur.marbleBag == 20 || ordinateur.marbleBag == 20){
        return console.log("c'est fini pour aujourd'hui")
  }
}
gameLoop()