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

function drawBasePlayerCardPlatform(ctx) {
    drawFilledRoundedRect(ctx, 50, 400, 250, 500, 5, "rgb(39, 176, 39)");
    drawHollowRoundedRect(ctx, 50, 400, 250, 500, 5, "rgb(24, 82, 24)", 5);
}

function drawBaseTableCardPlatform(ctx) {
    drawFilledRoundedRect(ctx, 287, 20, 450, 125, 5, "rgb(39, 176, 39)");
    drawHollowRoundedRect(ctx, 287, 20, 450, 125, 5, "rgb(24, 82, 24)", 5);
}

export {drawHollowRoundedRect, drawFilledRoundedRect, drawBasePlayerCardPlatform, drawBaseTableCardPlatform};