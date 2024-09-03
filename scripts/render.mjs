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

export function draw_full_player_input(ctx, current_cash, betting_amount, betting_percent, round_number, round_state) {
    const major_box = [50, 50];
    const minor_box = [40, 40];

    const abs_start = [400, 400];
    function r_pos(x, y) {
        return [x + abs_start[0], y + abs_start[1]]
    }

    function get_centered_position(text, area_x, area_y, area_width, area_height) {
        let text_width = ctx.measureText(text).width;
        let x = area_x + (area_width - text_width) / 2;
        let y = area_y + (area_height / 2) + (parseInt(ctx.font) / 2);
        return r_pos(x, y);
    }

    // Main Platform
    draw_filled_rounded_rect(ctx, ...abs_start, 500, 500, 5, "rgb(39, 176, 39)");
    draw_hollow_rounded_rect(ctx, ...abs_start, 500, 500, 5, "rgb(24, 82, 24)", 5);

    // Drawing betting logic (Bar showing how much, (cash & percent), betting more and less)
    draw_filled_rounded_rect(ctx, ...r_pos(15, 60), 250, 10, 5, "rgb(11, 125, 32)")
    draw_filled_rounded_rect(ctx, ...r_pos(15, 60), (250 * betting_percent), 10, 5, "rgb(39, 196, 39)")
    draw_hollow_rounded_rect(ctx, ...r_pos(15, 60), 250, 10, 5, "rgb(24, 82, 24)", 2)

    // Adding Text for betting numbers & Cash
    let text = `${betting_amount}$ (${betting_amount}%)`;
    ctx.font = "30px pixel_font";
    ctx.fillStyle = "rgb(24, 82, 24)";
    ctx.fillText(text, ...get_centered_position(text, 15, 5, 250, 55));
    ctx.fillText("- Cash -", ...get_centered_position("- Cash -", 265, 5, 250, 55));
    ctx.fillText(`${current_cash}$`, ...get_centered_position(`${current_cash}$`, 265, 45, 250, 55));

    let round_info = `${round_state} | ${round_number}`;
    ctx.fillText(round_info, ...get_centered_position(round_info, 265, 105, 250, 55));

    // Subtracting
    draw_filled_rect(ctx, ...r_pos(15, 80), ...major_box, "rgb(39, 196, 39)");
    draw_hollow_rect(ctx, ...r_pos(15, 80), ...major_box, "rgb(24, 82, 24)", 2)

    draw_filled_rect(ctx, ...r_pos(75, 85), ...minor_box, "rgb(39, 196, 39)");
    draw_hollow_rect(ctx, ...r_pos(75, 85), ...minor_box, "rgb(24, 82, 24)", 2);

    // Adding
    draw_filled_rect(ctx, ...r_pos(215, 80), ...major_box, "rgb(39, 196, 39)");
    draw_hollow_rect(ctx, ...r_pos(215, 80), ...major_box, "rgb(24, 82, 24)", 2)

    draw_filled_rect(ctx, ...r_pos(165, 85), ...minor_box, "rgb(39, 196, 39)");
    draw_hollow_rect(ctx, ...r_pos(165, 85), ...minor_box, "rgb(24, 82, 24)", 2);

    // Adding the add / subtract signs to the buttons
    draw_filled_rounded_rect(ctx, ...r_pos(25, 102), 30, 6, 4, "rgb(24, 82, 24)") // Major Sub

    draw_filled_rounded_rect(ctx, ...r_pos(85, 103), 20, 4, 3, "rgb(24, 82, 24)") // Minor Sub

    draw_filled_rounded_rect(ctx, ...r_pos(225, 102), 30, 6, 4, "rgb(24, 82, 24)") // Major Add
    draw_filled_rounded_rect(ctx, ...r_pos(236.9, 89.5), 6, 30, 4, "rgb(24, 82, 24)")

    draw_filled_rounded_rect(ctx, ...r_pos(175, 103), 20, 4, 3, "rgb(24, 82, 24)") // Minor Add
    draw_filled_rounded_rect(ctx, ...r_pos(182.5, 95), 4, 20, 3, "rgb(24, 82, 24)")
}
