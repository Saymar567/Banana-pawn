function startGame() {
    const startButton = document.querySelector("#startButton");
    startButton.style.display = "none";
    const restartButton = document.querySelector("#gameOver");
    const firstErase = document.querySelector(".firstErase");
    const dosErase = document.querySelector("#dos-fondo");
    const boardErase = document.querySelector("#board");
    //With this I've set a start Button that once pressed, dissappears
    /*const fondoAudio = document.querySelector("#fondo");
    fondoAudio.play();
    setInterval(() => {
     fondoAudio.play()}, 1000)*/
    //Now the game begins
    let score = 0;
    let lives = 3;
    let scoreLives = document.getElementById("lives");
    scoreLives.innerText = lives;

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
            /*if(this.pawnImage) {
                if(this.pawnImage === this.banana) {
                    delete this.banana
                } else if (this.pawnImage === this.minion) {
                    delete this.minion
                }
            }*/
        }

        collisionPawn() {
            if (this.pawnImage.parentNode.childNodes[0].classList[0] === 'banana-image') {
                this.pawnImage.parentNode.childNodes[0].remove();
                score += 10;
                let scorePoints = document.getElementById("score");
                scorePoints.innerText = score + " points!"
                console.log(score);
                if (score % 30 === 0) {
                    lives++;
                    scoreLives.innerText = lives;
                    setInterval(randomMinion, 3000);
                    let winningLifeAudio = document.querySelector("#winning-audio");
                    winningLifeAudio.play()
                    return true
                } else if (score % 50 === 0) {
                    setInterval(randomNewMinion, 2000)
                }
                else if (score % 100 === 0) {
                    setInterval(randomSuperBanana, 1000)
                }
                else if (score % 1000 === 0) {
                    let bestAudio = document.querySelector("#best-audio")
                    bestAudio.play()
                } else {
                    return false
                }

            }
        }
        collisionWithMinion() {
            if (this.pawnImage.parentNode.childNodes[0].classList[0] === 'minion-image') {
                console.log(this.pawnImage.parentNode)
                this.pawnImage.parentNode.childNodes[0].remove();
                lives -= 1;

                scoreLives.innerText = lives;
                console.log(lives)
                if (lives <= 0) {
                    const restartButton = document.querySelector("#gameOver");
                    restartButton.style.display = "block";
                    let minionAudio = document.querySelector("#audio");
                    minionAudio.play();
                    boardErase.remove();

                }
                return true
            } else if (this.pawnImage.parentNode.childNodes[0].classList[0] === 'purple-minion') {
                this.pawnImage.parentNode.childNodes[0].remove();
                lives -= 2;

                scoreLives.innerText = lives;
                if (lives <= 0) {
                    const restartButton = document.querySelector("#gameOver");
                    restartButton.style.display = "block";
                    let minionAudio = document.querySelector("#audio");
                    minionAudio.play();
                    boardErase.remove();
                }

            } else if (this.pawnImage.parentNode.childNodes[0].classList[0] === 'super-banana') {
                this.pawnImage.parentNode.childNodes[0].remove();
                score += 1000;
            }
            else {
                return false
            }
        }
    }




    class Banana extends GameObject {
        constructor(pawn) {
            super()
            this.pawn = pawn;
            this.banana = document.createElement("img");
            this.banana.src = "./images/bananas.png";
            this.banana.classList.add("banana-image");
        }
        bananaImage(square, pawn) {
            let squareWidth = square.offsetWidth;
            let squareHeight = square.offsetHeight;
            this.banana.style.width = squareWidth + "px";
            this.banana.style.height = squareHeight + "px";
            if (!square.hasChildNodes()) {
                square.innerHTML = "";
                square.appendChild(this.banana);

                setTimeout(() => {
                    if (!pawn.collisionPawn()) {
                        square.removeChild(this.banana)

                    }


                }, 4000);
            }

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
            if (!square.hasChildNodes()) {
                square.innerHTML = "";
                square.appendChild(this.minion);
                if (this.minion === this.pawnImage) {
                    square.removeChild(this.minion);
                } else {
                    setTimeout(() => { square.removeChild(this.minion) }, 5000);
                }

            }
        }
    }
    class NewMinion extends GameObject {
        constructor(pawnImage) {
            super(pawnImage);
            this.newMinion = document.createElement("img");
            this.newMinion.src = "./images/minion_morado-removebg-preview.png";
            this.newMinion.classList.add("purple-minion");
        }
        newMinionImage(square) {
            let squareWidth = square.offsetWidth;
            let squareHeight = square.offsetHeight;
            this.newMinion.style.width = squareWidth + "px";
            this.newMinion.style.height = squareHeight + "px";
            if (!square.hasChildNodes()) {
                square.innerHTML = "";
                square.appendChild(this.newMinion);
                if (this.newMinion === this.pawnImage) {
                    square.removeChild(this.newMinion);
                } else {
                    setTimeout(() => { square.removeChild(this.newMinion) }, 5000);
                }

            }
        }
    }

    /*class SuperBanana extends GameObject {
        constructor(pawn) {
            super();
            this.pawn = pawn;
            this.superBanana = document.createElement("img");
            this.superBanana.src = "./images/smiling-banana2.png"
            this.superBanana.classList.add("super-banana")
        }
        superBananaImage(square, pawn) {
            let squareWidth = square.offsetWidth;
            let squareHeight = square.offsetHeight;
            this.superBanana.style.width = squareWidth + "px";
            this.superBanana.style.height = squareHeight + "px";
            if (!square.hasChildNodes()) {
                square.innerHTML = "";
                square.appendChild(this.superBanana);

                setTimeout(() => {
                    if (!pawn.collisionPawn()) {
                        square.removeChild(this.superBanana)

                    }


                }, 4000);
            }
        }

    }*/

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
        bananaObject.bananaImage(randomSquare);
    }

    function randomMinion() {
        const minionObject = new Minion();
        let squares = document.querySelectorAll(".square");
        let randomIndex = Math.floor(Math.random() * squares.length);
        let randomSquare = squares[randomIndex];
        minionObject.minionImage(randomSquare);

    }
    function randomNewMinion() {
        const newMinionObject = new NewMinion();
        let squares = document.querySelectorAll(".square");
        let randomIndex = Math.floor(Math.random() * squares.length);
        let randomSquare = squares[randomIndex];
        newMinionObject.newMinionImage(randomSquare);
    }
    /*function randomSuperBanana() {
        const newSuperBanana = new SuperBanana();
        let squares = document.querySelectorAll(".square");
        let randomIndex = Math.floor(Math.random() * squares.length);
        let randomSquare = squares[randomIndex];
        newSuperBanana.superBananaImage(randomSquare)
    }
*/
    setInterval(randomBananas, 4000)
    setInterval(randomMinion, 5000)


    function restartGame() {
        score = 0;
        lives = 3;
        scoreLives.innerText = lives;
        restartButton.style.display = "none";

        location.reload()
    }
    restartButton.addEventListener("click", restartGame)

}

startButton.addEventListener("click", () => {
    startGame()
})


