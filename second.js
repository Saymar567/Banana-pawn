let score = 0;
let lives = 3;
class GameObject {
    constructor(square) {
        this.square = square;

    }
}
class Pawn extends GameObject {
    constructor(square) {
        super(square);
        const board = document.getElementById("board");
        this.squares = document.querySelectorAll(".square");
        this.currentSquareIndex = 0;
        this.pawnImage = new Image();
        this.pawnImage.src = "./images/chess-pawn-svgrepo-com  white.png";
        this.pawnImage.classList.add("piece");
        this.squares[this.currentSquareIndex].appendChild(this.pawnImage);
    }
    movePawn(direction) {
        /* squares[currentSquareIndex].removeChild(pawnImage)*/;
        this.collisionPawn();
        this.collisionWithMinion();
        if (direction === "ArrowUp" && this.currentSquareIndex >= 8) {
            this.currentSquareIndex -= 8;
        } else if (direction === "ArrowDown" && this.currentSquareIndex <= 56) {
            this.currentSquareIndex += 8;
        } else if (direction === "ArrowLeft" && this.currentSquareIndex % 8 !== 0) {
            this.currentSquareIndex -= 1;
        } else if (direction === "ArrowRight" && (this.currentSquareIndex + 1) % 8 !== 0) {
            this.currentSquareIndex += 1;
        };
        this.squares[this.currentSquareIndex].appendChild(this.pawnImage);

    }

    collisionPawn() {
        if (this.pawnImage.parentNode.childNodes[0].classList[0] === 'banana-image') {
            this.pawnImage.parentNode.childNodes[0].remove();
            score += 10;
            let scorePoints = document.getElementById("score");
            scorePoints.innerText = score + " points!"
            console.log(score);
            if (score % 100 === 0) {
                alert("YOU WON ANOTHER LIFE!");

            }
            return true
        } else {
            return false
        }
    }
    collisionWithMinion() {
        if (this.pawnImage.parentNode.childNodes[0].classList[0] === 'minion-image') {
            console.log(this.pawnImage.parentNode)
            this.pawnImage.parentNode.childNodes[0].remove();
            lives -= 1;
            let scoreLives = document.getElementById("lives");
            scoreLives.innerText = lives;
            console.log(lives)
            if (lives === 0) {
                alert("MINIONS GOT ALL THE BANANAAAAAAS!")
            }
            return true
        } else {
            return false
        }
    }
}



class Banana extends GameObject {
    constructor(pawn) {
        super()
        this.pawn = pawn;
        this.banana = document.createElement("img");
        this.banana.src = "./images/bananas.jpg";
        this.banana.classList.add("banana-image");
    }
    bananaImage(square, pawn) {
        let squareWidth = square.offsetWidth;
        let squareHeight = square.offsetHeight;
        this.banana.style.width = squareWidth + "px";
        this.banana.style.height = squareHeight + "px";
        square.innerHTML = "";
        square.appendChild(this.banana);

        setTimeout(() => {
            if (!pawn.collisionPawn()) {
                square.removeChild(this.banana)

            }


        }, 4000);
    }
}


class Minion extends GameObject {
    constructor(pawnImage) {
        super(pawnImage);
        this.minion = document.createElement("img");
        this.minion.src = "./images/minion 03.png";
        this.minion.classList.add("minion-image");
    }
    minionImage(square) {

        let squareWidth = square.offsetWidth;
        let squareHeight = square.offsetHeight;
        this.minion.style.width = squareWidth + "px";
        this.minion.style.height = squareHeight + "px";
        square.innerHTML = "";
        square.appendChild(this.minion);
        if (this.minion === this.pawnImage) {
            square.removeChild(this.minion);
        } else {
            setTimeout(() => { square.removeChild(this.minion) }, 5000);
        }

    }
}


const pawn = new Pawn();
const banana = new Banana(pawn);

document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
            pawn.movePawn(event.key);
            break
    }
})


function randomBananas() {
    const bananaObject = new Banana()
    let squares = document.querySelectorAll(".square");
    let randomIndex = Math.floor(Math.random() * squares.length);
    let randomSquare = squares[randomIndex];
    bananaObject.bananaImage(randomSquare, pawn);
}

function randomMinion() {
    const minionObject = new Minion();
    let squares = document.querySelectorAll(".square");
    let randomIndex = Math.floor(Math.random() * squares.length);
    let randomSquare = squares[randomIndex];
    minionObject.minionImage(randomSquare);

}





setInterval(randomBananas, 4000)
setInterval(randomMinion, 5000)

