//När playknappen klickas skickas man till spelsidan (hangman.html)
document.getElementById("play").addEventListener('click', function () {
    location.href = "hangman.html";
});

//Property .localStorage sparar key/value pairs i webbläsaren (så att värdet kan tas med till nästa sida)
document.getElementById("easy").addEventListener('click', function () {
    localStorage.clear(); //metoden clear används för att endast ett värde ska kunna sparas (alltså inte sparas på varandra)
    localStorage.setItem("difficulty", "easy")
});
document.getElementById("medium").addEventListener('click', function () {
    localStorage.clear();
    localStorage.setItem("difficulty", "medium")
});
document.getElementById("hard").addEventListener('click', function () {
    localStorage.clear();
    localStorage.setItem("difficulty", "hard")
});

//Lagrar standardvärde (om man inte valt svårighetsgrad ovan)
localStorage.setItem("difficulty", "medium")