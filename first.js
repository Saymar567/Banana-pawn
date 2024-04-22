class Pawn {
    constructor(name) {
        this.name = name;
    }

}


function createEventListeners() {
    let pieces = document.querySelectorAll(".piece");
    pieces.forEach(piece => {
        piece.addEventListener("click", function() {
            console.log(this.parentElement)
            let from = this.parentElement.id;
            let possibleDestinations = generatePossibleDestinations(from);
            let destination = prompt("Choose destination position:", possibleDestinations.join(""));
            movePiece(from, destination);
        });
    });
}
createEventListeners();

function movePiece(from, to) {
    document.getElementById(to).innerHTML = document.getElementById(from).innerHTML;
    document.getElementById(from).innerHTML = "";
   createEventListeners();
}

function generatePossibleDestinations(currentPosition) {
    let column = currentPosition.charAt(0);
    let row = parseInt(currentPosition.charAt(1));

    let possibleDestinations = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let newColumn = String.fromCharCode(column.charCodeAt(0) + i);
            let newRow = row + j;
            if (newColumn >= 'a' && newColumn <= 'h' && newRow >= 1 && newRow <= 8) {
                possibleDestinations.push(newColumn + newRow)
            }
        }
    }
    return possibleDestinations
}


