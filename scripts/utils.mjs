function drawHollowRoundedRect(ctx, x, y, width, height, roundedNess, borderColor, borderWidth) {
    ctx.beginPath();
    ctx.moveTo(x + roundedNess, y);
    ctx.arcTo(x + width, y, x + width, y + height, roundedNess);
    ctx.arcTo(x + width, y + height, x, y + height, roundedNess);
    ctx.arcTo(x, y + height, x, y, roundedNess);
    ctx.arcTo(x, y, x + width, y, roundedNess);
    ctx.closePath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
}
function drawFilledRoundedRect(ctx, x, y, width, height, roundedNess, fillColor) {
    ctx.beginPath();
    ctx.moveTo(x + roundedNess, y);
    ctx.arcTo(x + width, y, x + width, y + height, roundedNess);
    ctx.arcTo(x + width, y + height, x, y + height, roundedNess);
    ctx.arcTo(x, y + height, x, y, roundedNess);
    ctx.arcTo(x, y, x + width, y, roundedNess);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
}

// Drawing Skeleton features of the table
function drawBasePlayerCardPlatform(ctx) {
    drawFilledRoundedRect(ctx, 50, 400, 250, 500, 5, "rgb(39, 176, 39)");
    drawHollowRoundedRect(ctx, 50, 400, 250, 500, 5, "rgb(24, 82, 24)", 5);
}

function drawBaseTableCardPlatform(ctx) {
    drawFilledRoundedRect(ctx, 287, 20, 450, 125, 5, "rgb(39, 176, 39)");
    drawHollowRoundedRect(ctx, 287, 20, 450, 125, 5, "rgb(24, 82, 24)", 5);
}

// Draw Cards for hands
function drawPlayerCards(ctx, deck) {
    let cardOne = deck.playerHand[0];
    let cardTwo = deck.playerHand[1];

    ctx.drawImage(cardOne[2], 62, 414, 105, 150);
    ctx.drawImage(cardTwo[2], 182, 414, 105, 150);
}

export {drawHollowRoundedRect, drawFilledRoundedRect, drawBasePlayerCardPlatform, drawBaseTableCardPlatform, drawPlayerCards};