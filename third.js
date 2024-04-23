if(bananaImage.parentNode === pawnImage.parentNode) {
    bananaImage.parentNode.removeChild(bananaImage);
};

if(minionImage.x === pawnImage.x && minionImage.y === pawnImage.y) {
minionImage.parentNode.removeChild(minionImage);
}