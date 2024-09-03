import { draw_full_player_input } from "./render.mjs";

export default class Input {
    constructor() {
        // Mouse Input
        this.down = false;
        this.position = null;

        // Player info
        this.player = null
        this.betting_amount = null

        // End Decision
        this.decision = null;

        // Collision Boxes (Decisions, betting)
        this.boxes = {
            major_add: null,
            minor_add: null,

            major_sub: null,
            minor_sub: null,

            check: null,
            fold: null,
            bet: null,
        }
    }

    update(controller) {
        this.player = controller.get_main_player();

        if (this.betting_amount == null)
            this.betting_amount = this.player.cash * 0.75;

        this.get_collision();
    }

    render(ctx) {
        draw_full_player_input(ctx, this.player.cash, this.betting_amount, this.betting_amount / this.player.cash);
    }

    set_up_event_listeners(canvas) {
        canvas.addEventListener("mousedown", (e) => {
            this.down = true;     
            
            // Getting Position for button collision detection
            let rect = canvas.getBoundingClientRect();
            let position = [e.clientX - rect.left, e.clientY - rect.top];
        })
        canvas.addEventListener("mouseup", (e) => {
            this.down = false;
        })
    }

    get_collision() {
        
    }
}