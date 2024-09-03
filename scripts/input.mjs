import { draw_full_player_input } from "./render.mjs";

export default class Input {
    constructor() {
        // Mouse Input
        this.down = false;
        this.button_clicked = false;
        this.position = null;

        // Player info
        this.player = null;
        this.betting_amount = null;

        this.min_bet = null;

        // End Decision
        this.decision = null;

        // Collision Boxes (Decisions, betting)
        this.boxes = { // X, Y, Width, Height
            "major_add": [615, 480, 50, 50],
            "minor_add": [565, 485, 40, 40],

            "major_sub": [415, 480, 50, 50],
            "minor_sub": [475, 485, 40, 40],

            "check": null,
            "fold": null,
            "bet": null,
        }
        this.button_status = {
            "major_add": false,
            "minor_add": false,

            "major_sub": false,
            "minor_sub": false,

            "check": false,
            "fold": false,
            "bet": false,
        }
    }

    update(controller, min) {
        this.player = controller.get_main_player();

        if (this.betting_amount == null)
            this.betting_amount = min;

        this.min_bet = min;
        if (this.betting_amount < this.min_bet)
            this.betting_amount = this.min_bet;

        this.get_collision();

        if (this.button_status.major_add) 
            this.betting_amount = this.clamp(this.betting_amount + 10, this.min_bet, this.player.cash);
        else if (this.button_status.minor_add)
            this.betting_amount = this.clamp(this.betting_amount + 1, this.min_bet, this.player.cash);
        else if (this.button_status.major_sub)
            this.betting_amount = this.clamp(this.betting_amount - 10, this.min_bet, this.player.cash);
        else if (this.button_status.minor_sub)
            this.betting_amount = this.clamp(this.betting_amount - 1, this.min_bet, this.player.cash);
    }

    render(ctx, round_num, round_state) {
        draw_full_player_input(ctx, this.player.cash, this.betting_amount, this.betting_amount / this.player.cash, round_num, round_state);
    }

    set_up_event_listeners(canvas) {
        canvas.addEventListener("mousedown", (e) => {
            alert()
            this.down = true;     
            this.button_clicked = false;

            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (canvas.height / rect.height);
            this.position = [x, y];
        });
        canvas.addEventListener("mouseup", (e) => {
            this.down = false;
            this.button_clicked = false;
        });
        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (canvas.height / rect.height);
            this.position = [x, y];
        });
    
        canvas.addEventListener("touchstart", (e) => {
            alert("TOUCH SQUEEN");
        })
    }

    get_collision() {
        Object.entries(this.button_status).forEach(([n, _clicked]) => {
            this.button_status[n] = false;
        })

        if (this.down && !this.button_clicked) {
            Object.entries(this.boxes).forEach(([n, dimensions]) => {       
                if (dimensions != null) {                    
                    const x = dimensions[0];
                    const y = dimensions[1];
                    const width = dimensions[2];
                    const height = dimensions[3];
                    if (this.position[0] > x && this.position[0] < width + x  &&
                        this.position[1] > y && this.position[1] < height + y
                    ) {
                        this.button_clicked = true;
                        this.button_status[n] = true;     
                    }
                }
            })
        }
    }

    clamp(amount, min, max) {
        if (amount > max)
            return max;
        else if (amount < min) 
            return min;
        return amount;
    }
}