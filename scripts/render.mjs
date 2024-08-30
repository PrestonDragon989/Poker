// simple Shape Drawing Functions
function draw_hollow_rounded_rect(ctx, x, y, width, height, roundedNess, borderColor, borderWidth) {
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
function draw_filled_rounded_rect(ctx, x, y, width, height, roundedNess, fillColor) {
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
function draw_hollow_rect(ctx, x, y, width, height, borderColor, borderWidth) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.closePath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
}
function draw_filled_rect(ctx, x, y, width, height, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
}
export function clear_screen(ctx, canvas) {
    draw_filled_rect(ctx, 0, 0, canvas.width, canvas.height, "rgb(11, 125, 32)")
}

// Various other Cosmetic functions
function golden_outline(ctx, x, y, width, height) {
    drawFilledRect(ctx, x, y, width, height, "rgba(222, 213, 35, .4)");
    drawHollowRect(ctx, x, y, width, height, "rgb(222, 213, 35)", 2.5);
}

// Drawing Skeleton features of the table
function draw_base_main_player_card_platform(ctx) {
    draw_filled_rounded_rect(ctx, 50, 400, 250, 500, 5, "rgb(39, 176, 39)");
    draw_hollow_rounded_rect(ctx, 50, 400, 250, 500, 5, "rgb(24, 82, 24)", 5);
}

function draw_base_community_card_platform(ctx) {
    draw_filled_rounded_rect(ctx, 287, 20, 450, 125, 5, "rgb(39, 176, 39)");
    draw_hollow_rounded_rect(ctx, 287, 20, 450, 125, 5, "rgb(24, 82, 24)", 5);
}

// Draw Cards for hands / Table
function draw_main_player_cards(ctx, player) {
    let card_one = player.hand[1];
    let card_two = player.hand[2];

    ctx.drawImage(card_one[2], 62, 414, 105, 150);
    ctx.drawImage(card_two[2], 182, 414, 105, 150);
}
function draw_community_cards(ctx, deck) {
    for (let i = 0; i < deck.community_cards.length; i++) {
        ctx.drawImage(deck.community_cards[i][2], 301 + (87 * i), 32, 70, 100); // 287, 20, 70, 100
    };
}
function draw_community_card_spots(ctx) {
    for (let i = 0; i < 5; i++) {
        draw_hollow_rect(ctx, 301 + (87 * i), 32, 70, 100, "rgb(7, 79, 20)", 3);
    };
}

// Total Card Drawing Functions
export function draw_full_community_cards(ctx, deck) {
    draw_base_community_card_platform(ctx)
    draw_community_card_spots(ctx);
    draw_community_cards(ctx, deck);
}
export function draw_full_player_cards(ctx, deck) {
    draw_base_main_player_card_platform(ctx);
    draw_main_player_cards(ctx, deck);
}
