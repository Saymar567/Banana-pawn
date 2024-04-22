//NOW IT WILL APPEAR BANANAS AND MINIONS

function bananaImage (square){
    let banana = document.createElement("img");
    banana.src = "./images/bananas.jpg";
banana.classList.add("banana-image");
let squareWidth = square.offsetWidth;
let squareHeight = square.offsetHeight;
banana.style.width = squareWidth + "px";
banana.style.height = squareHeight + "px";
console.log(square.firstChild)
square.innerHTML = "";
square.appendChild(banana);
setTimeout(()=>{square.innerHTML = ""}, 1000);
}

function minionImage (square) {
let minion = document.createElement("img");
minion.src = "./images/minion 03.png";
minion.classList.add("minion-image");
let squareWidth = square.offsetWidth;
let squareHeight = square.offsetHeight;
minion.style.width = squareWidth + "px";
minion.style.height = squareHeight + "px";
square.innerHTML = "";
square.appendChild(minion)
setTimeout(()=>{square.innerHTML = ""}, 3000);
}



function randomBananas(){
    let squares = document.querySelectorAll(".square");
    let randomIndex = Math.floor(Math.random() * squares.length);
    let randomSquare = squares[randomIndex];
    bananaImage(randomSquare);
}

function randomMinion() {
    let squares = document.querySelectorAll(".square");
    let randomIndex = Math.floor(Math.random() * squares.length);
    let randomSquare = squares[randomIndex];
    minionImage(randomSquare);

}

setInterval(randomBananas, 2000)
setInterval(randomMinion, 2000)   

