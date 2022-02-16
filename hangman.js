//Visar hur många liv du har kvar
let pointCount = 5;
let counter = document.getElementById('counter-p');
counter.innerHTML = pointCount;

//Deklarerar alla kroppsdelar
let scaffold = document.getElementById('scaffold');
let head = document.getElementById('head');
let body = document.getElementById('body');
let arms = document.getElementById('arms');
let legs = document.getElementById('legs');

//Deklarerar easy ordlista
let easy = ["referee", "terrace", "control", "smooth", "effort", "freeze", "comment", "member", "possible", "channel", "shatter", "choose", "reveal", "reject", "agenda"]
//Deklarerar easy hints
let hintEasy = ["umpire", "sundeck", "in charge", "not rough", "trying hard", "very cold", "annotation", "patronage", "do-able", "SVT 1", "break", "elect", "show", "discard", "schedule"]
//Deklarerar medium ordlista
let medium = ["science", "agency", "linen", "miner", "victory", "catalogue", "royalty", "criminal", "charter", "ceremony", "infinite", "pudding", "profession", "vision"]
//Deklarerar medium hints
let hintMedium = ["s", "a", "l", "m", "v", "c", "r", "c", "c", "c", "i", "p", "p", "v"]
//Deklarerar hard ordlista
let hard = ["pneumonia", "cylinder", "tournament", "indication", "consensus", "deficiency", "ostracize", "initiative", "hypotenuse", "tantamount", "charismatic", "conglomerate", "legislature", "hypothesize", "acquisition"]
//Deklarerar ledtråds-container
let hints = document.getElementById('hints')

//Deklarerar array wordList där vald ordlista ska sparas
let wordList = []
//Deklarerar variabel där random ord ur ordlista ska sparas
let hiddenWord;
//Deklarerar variabel där random index ska sparas
let selectName;
//Säger sig självt
let hintIndex;

//Hämtar ut värdet difficulty från "first-page" och väljer svårighetsgrad
if (localStorage.getItem("difficulty") == "easy") {
    levelSelect(easy);
}
if (localStorage.getItem("difficulty") == "medium") {
    levelSelect(medium);
}
if (localStorage.getItem("difficulty") == "hard") {
    levelSelect(hard);
}

//Funktion som adderar vald lista(svårighetsgrad) till wordList array. 
//.flat() används föratt göra om listobjektet till en lista.
//Med hjälp av math random slumpas i selectName en siffra motsvarande index i wordList. 
function levelSelect(param) {
    if (param === easy) {
        wordList.push(easy)
        wordList = wordList.flat();
        selectName = Math.floor(Math.random() * wordList.length)
    }
    if (param === medium) {
        wordList.push(medium)
        wordList = wordList.flat();
        console.log(wordList);
        selectName = Math.floor(Math.random() * wordList.length)
        console.log(selectName);
    }
    if (param === hard) {
        wordList.push(hard)
        wordList = wordList.flat();
        selectName = Math.floor(Math.random() * wordList.length)
    }

    //Ord från wordList med ovanstående indexsiffra(selectName) sparas i hiddenWord
    hiddenWord = wordList[selectName]

    //hintIndex får samma värde som selectName
    hintIndex = selectName

    //3x if, plockar ut rätt hint från arrayen + gör nya p-taggar som läggs till i html med appendChild
    if (wordList[selectName] == easy[selectName]) {
        let hintSelect = hintEasy[hintIndex]
        hintBox = document.createElement('p')
        hints.appendChild(hintBox)
        hintBox.innerHTML = hintSelect
    }
    if (wordList[selectName] == medium[selectName]) {
        let hintSelect = hintMedium[hintIndex]
        hintBox = document.createElement('p')
        hints.appendChild(hintBox)
        hintBox.innerHTML = hintSelect
    }
    if (wordList[selectName] == hard[selectName]) {
        hintBox = document.createElement('p')
        hints.appendChild(hintBox)
        hintBox.innerHTML = 'No clues at this stage'
    }

    //Skapar div med p + id(letter+i) för varje bokstav i hiddenWord
    for (i = 0; i < hiddenWord.length; i++) {
        let letterDiv = document.createElement('div');
        document.getElementById('hidden-text').appendChild(letterDiv);
        letterDiv.style.display = "inline"
        let letterP = document.createElement('p');
        letterDiv.appendChild(letterP);
        letterP.style.display = "none";
        letterP.innerHTML = hiddenWord[i];
        letterP.id = `letters${i}`; //Skapar dynamiskt id mha string interpolation
    }
}

//Hämtar try-again-knapp
let tryAgain = document.getElementById('try-again');
//Deklarerar array som sparar unika input-bokstäver
let guessedLetters = []
//Hämtar alla p-taggar
let allP = document.getElementsByTagName('p');
//Deklarerar counter som ska adderas varje gång i-klickad bokstav finns i hiddenWord 
let winnerCounter = 0;

//Då en tangent klickas händer följande
document.addEventListener('keypress', function (e) {
    let userInput = e.key; //variabeln userInput får värdet av den knapp som användaren trycker

    if (saveLetters(userInput) == true) { //Funktionen saveLetters kollar om input-bokstaven använts tidigare och lägger annars till den i arrayen guessedLetters). Om funktionen returnerat true (bokstaven har inte använts tidigare) körs följande kod. 

        if (hiddenWord.includes(userInput) == true) { //Om input-bokstaven finns i hiddenWord körs loopen (kontrolleras med hjälp av metoden .includes()) 

            for (i = 0; i < hiddenWord.length; i++) {

                if (userInput === hiddenWord[i]) { //om bokstaven finns i hiddenWord displayas bokstaven som tidigare varit dold
                    document.getElementById(`letters${i}`).style.display = 'block';
                    winnerCounter++

                    if (hiddenWord.length == winnerCounter) {
                        withWin(); //funktion som påkallas om man vinner
                    }
                }
            }

        } else { //Har man skrivit in fel bokstav händer följande:
            pointCount--; //Liv dras
            counter.innerHTML = pointCount;
            displayBody(pointCount); //Kropsdel displayas (mha funktionen displayBody)
        }

    } else {
        alert("Bokstaven har redan använts");
    }
});

// Funktion som sparar input-bokstäverna i en array (guessedLetters), om de inte redan finns med i listan och returnerar true/false om bokstaven finns med i arrayen eller ej
function saveLetters(letter) {

    if (guessedLetters.includes(letter) == false) { //om parametern (input-bokstaven) inte finns i guessedLetters...
        guessedLetters.push(letter) //...läggs den till i arrayen mha .push. 

        let guessed = document.createElement('p'); //för varje input-bokstav skapas en tom p-tagg (lagras i variabeln guessed)
        document.getElementById('guessedLetters').appendChild(guessed); //p-taggen placeras i html-dokumentet
        guessed.style.display = 'inline';
        guessed.innerHTML = letter + ', ' //input-bokstaven skrivs in i p-taggen

        return true //visar att bokstaven inte använts tidigare 

    } else {
        return false //om input-bokstaven redan finns i arrayen guessedLetters
    }
};

//Funktion som ändrar visibility (kroppsdelar) vid fel bokstav baserat på hur mycket liv man har
function displayBody(pointCount) {
    if (pointCount == 4) {
        scaffold.style.visibility = 'visible';
    }
    if (pointCount == 3) {
        head.style.visibility = 'visible';
    }
    if (pointCount == 2) {
        body.style.visibility = 'visible';
    }
    if (pointCount == 1) {
        arms.style.visibility = 'visible';
    }
    if (pointCount == 0) {
        legs.style.visibility = 'visible';

        tryAgain.style.display = 'block'; //'try again'-knapp visas
        gameOver(); //SVG visas
        exitBottom(); //Animationer
        ground.style.fill = "red";

        for (p of allP) {
            p.style.display = "inline-block"; //rätt svar visas
        }
    }
}

//funktion som om man vinner displayar vinst-meddelande, overlay och try-again-knapp
function withWin() {
    document.getElementById('you-win').style.visibility = "visible";
    document.getElementById('overlay').style.display = 'block';
    tryAgain.style.display = 'block';
}

//Skickar en till förstasidan när try-again-knappen klickas
document.getElementById("try-again").addEventListener('click', function () {
    location.href = "firstPage.html";
});

//Funktion som visar 'game over'-SVGn
function gameOver() {
    document.getElementById('game-over').style.visibility = 'visible';
    document.getElementById('overlay').style.display = 'block';
};

//Animationer
function exitBottom() {
    scaffold.style.animation = 'swoopOutBottom 2s'
    scaffold.style.animationFillMode = 'forwards'
    legs.style.animation = 'swoopOutBottom 2s'
    legs.style.animationFillMode = 'forwards'
    head.style.animation = 'swoopOutBottom 2s'
    head.style.animationFillMode = 'forwards'
    body.style.animation = 'swoopOutBottom 2s'
    body.style.animationFillMode = 'forwards'
    arms.style.animation = 'swoopOutBottom 2s'
    arms.style.animationFillMode = 'forwards'
}