// if minion and pawn are in the same checkbox, pawn dies
// implement the number of minions with the level

document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const squares = document.querySelectorAll(".square");
    let currentSquareIndex = 0;
    const pawnImage = new Image();
    pawnImage.src = "./images/chess-pawn-svgrepo-com  white.png";
    pawnImage.classList.add("piece");
    squares[currentSquareIndex].appendChild(pawnImage);

    function movePawn(direction) {
       /* squares[currentSquareIndex].removeChild(pawnImage)*/;
        if (direction === "ArrowUp" && currentSquareIndex >= 8) {
            currentSquareIndex -= 8;
        } else if (direction === "ArrowDown" && currentSquareIndex <= 56) {
            currentSquareIndex += 8;
        } else if (direction === "ArrowLeft" && currentSquareIndex % 8 !== 0) {
            currentSquareIndex -= 1;
        } else if (direction === "ArrowRight" && (currentSquareIndex + 1) % 8 !== 0) {
            currentSquareIndex += 1;
        }
        squares[currentSquareIndex].appendChild(pawnImage);
    }

    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
                movePawn(event.key);
                break
        }
    })
})