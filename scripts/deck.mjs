export default class CardDeck {
    constructor(size) {
        // Deck size
        this.size = size;

        // Card Sprites
        this.card_sprites = {
            clubs: {
                ace: new Image(70, 100), two: new Image(70, 100), three: new Image(70, 100), four: new Image(70, 100), five: new Image(70, 100), six: new Image(70, 100), seven: new Image(70, 100), eight: new Image(70, 100), nine: new Image(70, 100), ten: new Image(70, 100), jack: new Image(70, 100), queen: new Image(70, 100), king: new Image(70, 100)
            },
            spades: {
                ace: new Image(70, 100), two: new Image(70, 100), three: new Image(70, 100), four: new Image(70, 100), five: new Image(70, 100), six: new Image(70, 100), seven: new Image(70, 100), eight: new Image(70, 100), nine: new Image(70, 100), ten: new Image(70, 100), jack: new Image(70, 100), queen: new Image(70, 100), king: new Image(70, 100)
            },
            hearts: {
                ace: new Image(70, 100), two: new Image(70, 100), three: new Image(70, 100), four: new Image(70, 100), five: new Image(70, 100), six: new Image(70, 100), seven: new Image(70, 100), eight: new Image(70, 100), nine: new Image(70, 100), ten: new Image(70, 100), jack: new Image(70, 100), queen: new Image(70, 100), king: new Image(70, 100)
            },
            diamonds: {
                ace: new Image(70, 100), two: new Image(70, 100), three: new Image(70, 100), four: new Image(70, 100), five: new Image(70, 100), six: new Image(70, 100), seven: new Image(70, 100), eight: new Image(70, 100), nine: new Image(70, 100), ten: new Image(70, 100), jack: new Image(70, 100), queen: new Image(70, 100), king: new Image(70, 100)
            }
        }

        // Total Card deck
        this.all_cards = [
            [1, "diamond", this.card_sprites.diamonds.ace], [2, "diamond", this.card_sprites.diamonds.two], [3, "diamond", this.card_sprites.diamonds.three], [4, "diamond", this.card_sprites.diamonds.four], [5, "diamond", this.card_sprites.diamonds.five], [6, "diamond", this.card_sprites.diamonds.six], [7, "diamond", this.card_sprites.diamonds.seven], [8, "diamond", this.card_sprites.diamonds.eight], [9, "diamond", this.card_sprites.diamonds.nine], [10, "diamond", this.card_sprites.diamonds.ten], [11, "diamond", this.card_sprites.diamonds.jack], [12, "diamond", this.card_sprites.diamonds.queen], [13, "diamond", this.card_sprites.diamonds.king],
            [1, "spade", this.card_sprites.spades.ace], [2, "spade", this.card_sprites.spades.two], [3, "spade", this.card_sprites.spades.three], [4, "spade", this.card_sprites.spades.four], [5, "spade", this.card_sprites.spades.five], [6, "spade", this.card_sprites.spades.six], [7, "spade", this.card_sprites.spades.seven], [8, "spade", this.card_sprites.spades.eight], [9, "spade", this.card_sprites.spades.nine], [10, "spade", this.card_sprites.spades.ten], [11, "spade", this.card_sprites.spades.jack], [12, "spade", this.card_sprites.spades.queen], [13, "spade", this.card_sprites.spades.king],
            [1, "heart", this.card_sprites.hearts.ace], [2, "heart", this.card_sprites.hearts.two], [3, "heart", this.card_sprites.hearts.three], [4, "heart", this.card_sprites.hearts.four], [5, "heart", this.card_sprites.hearts.five], [6, "heart", this.card_sprites.hearts.six], [7, "heart", this.card_sprites.hearts.seven], [8, "heart", this.card_sprites.hearts.eight], [9, "heart", this.card_sprites.hearts.nine], [10, "heart", this.card_sprites.hearts.ten], [11, "heart", this.card_sprites.hearts.jack], [12, "heart", this.card_sprites.hearts.queen], [13, "heart", this.card_sprites.hearts.king],
            [1, "club", this.card_sprites.clubs.ace], [2, "club", this.card_sprites.clubs.two], [3, "club", this.card_sprites.clubs.three], [4, "club", this.card_sprites.clubs.four], [5, "club", this.card_sprites.clubs.five], [6, "club", this.card_sprites.clubs.six], [7, "club", this.card_sprites.clubs.seven], [8, "club", this.card_sprites.clubs.eight], [9, "club", this.card_sprites.clubs.nine], [10, "club", this.card_sprites.clubs.ten], [11, "club", this.card_sprites.clubs.jack], [12, "club", this.card_sprites.clubs.queen], [13, "club", this.card_sprites.clubs.king]
        ];

        // Playing Decks
        this.total_deck;
        this.current_deck;

        // Cards currently on the table
        this.community_cards = [];

        // Loading Sprites
        this.load_card_sprites();
    }

    // Card Management functions (set deck, shuffle deck, deal cards, etc. . .)
    set_current_deck() {
        this.total_deck = [];
        for (let i = 0; i < this.size; i++) {
            this.total_deck = this.total_deck.concat(this.all_cards);
        }
        this.current_deck = this.total_deck;
    }

    shuffle_deck(players) {
        // Shuffling Current Deck
        for (let i = this.current_deck.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [this.current_deck[i], this.current_deck[r]] = [this.current_deck[r], this.current_deck[i]];
        }
    }

    // Simpley dealing a shuffled card. It then removes that card from the deck
    deal_card() {
        // Dealing card, and removing it from the current deck
        const card_dealt = this.current_deck[0];
        this.current_deck.splice(0, 1);
        return card_dealt;
    }

    // Deal player and table cards
    deal_player_cards(players) {
        for (let i = 0; i < Object.keys(players).length; i++) {
            players[String(i + 1)].hand[1] = this.deal_card();
            players[String(i + 1)].hand[2] = this.deal_card();
        }
    }

    deal_community_cards(numCards = 1) {
        for (let i = 0; i < numCards; i++) {
            this.community_cards.push(this.deal_card());
        }
    }

    // Setting up Card Sprites
    load_card_sprites() {
        // Loading Club Sprites
        this.card_sprites.clubs.ace.src = "card-images/club-cards/ace-club.png";
        this.card_sprites.clubs.two.src = "card-images/club-cards/two-club.png";
        this.card_sprites.clubs.three.src = "card-images/club-cards/three-club.png";
        this.card_sprites.clubs.four.src = "card-images/club-cards/four-club.png";
        this.card_sprites.clubs.five.src = "card-images/club-cards/five-club.png";
        this.card_sprites.clubs.six.src = "card-images/club-cards/six-club.png";
        this.card_sprites.clubs.seven.src = "card-images/club-cards/seven-club.png";
        this.card_sprites.clubs.eight.src = "card-images/club-cards/eight-club.png";
        this.card_sprites.clubs.nine.src = "card-images/club-cards/nine-club.png";
        this.card_sprites.clubs.ten.src = "card-images/club-cards/ten-club.png";
        this.card_sprites.clubs.jack.src = "card-images/club-cards/jack-club.png";
        this.card_sprites.clubs.queen.src = "card-images/club-cards/queen-club.png";
        this.card_sprites.clubs.king.src = "card-images/club-cards/king-club.png";

        // Loading Spade Sprites
        this.card_sprites.spades.ace.src = "card-images/spade-cards/ace-spade.png";
        this.card_sprites.spades.two.src = "card-images/spade-cards/two-spade.png";
        this.card_sprites.spades.three.src = "card-images/spade-cards/three-spade.png";
        this.card_sprites.spades.four.src = "card-images/spade-cards/four-spade.png";
        this.card_sprites.spades.five.src = "card-images/spade-cards/five-spade.png";
        this.card_sprites.spades.six.src = "card-images/spade-cards/six-spade.png";
        this.card_sprites.spades.seven.src = "card-images/spade-cards/seven-spade.png";
        this.card_sprites.spades.eight.src = "card-images/spade-cards/eight-spade.png";
        this.card_sprites.spades.nine.src = "card-images/spade-cards/nine-spade.png";
        this.card_sprites.spades.ten.src = "card-images/spade-cards/ten-spade.png";
        this.card_sprites.spades.jack.src = "card-images/spade-cards/jack-spade.png";
        this.card_sprites.spades.queen.src = "card-images/spade-cards/queen-spade.png";
        this.card_sprites.spades.king.src = "card-images/spade-cards/king-spade.png";

        // Heart Card Sources
        this.card_sprites.hearts.ace.src = "card-images/heart-cards/ace-heart.png";
        this.card_sprites.hearts.two.src = "card-images/heart-cards/two-heart.png";
        this.card_sprites.hearts.three.src = "card-images/heart-cards/three-heart.png";
        this.card_sprites.hearts.four.src = "card-images/heart-cards/four-heart.png";
        this.card_sprites.hearts.five.src = "card-images/heart-cards/five-heart.png";
        this.card_sprites.hearts.six.src = "card-images/heart-cards/six-heart.png";
        this.card_sprites.hearts.seven.src = "card-images/heart-cards/seven-heart.png";
        this.card_sprites.hearts.eight.src = "card-images/heart-cards/eight-heart.png";
        this.card_sprites.hearts.nine.src = "card-images/heart-cards/nine-heart.png";
        this.card_sprites.hearts.ten.src = "card-images/heart-cards/ten-heart.png";
        this.card_sprites.hearts.jack.src = "card-images/heart-cards/jack-heart.png";
        this.card_sprites.hearts.queen.src = "card-images/heart-cards/queen-heart.png";
        this.card_sprites.hearts.king.src = "card-images/heart-cards/king-heart.png";

        // Diamond Card Sources
        this.card_sprites.diamonds.ace.src = "card-images/diamond-cards/ace-diamond.png";
        this.card_sprites.diamonds.two.src = "card-images/diamond-cards/two-diamond.png";
        this.card_sprites.diamonds.three.src = "card-images/diamond-cards/three-diamond.png";
        this.card_sprites.diamonds.four.src = "card-images/diamond-cards/four-diamond.png";
        this.card_sprites.diamonds.five.src = "card-images/diamond-cards/five-diamond.png";
        this.card_sprites.diamonds.six.src = "card-images/diamond-cards/six-diamond.png";
        this.card_sprites.diamonds.seven.src = "card-images/diamond-cards/seven-diamond.png";
        this.card_sprites.diamonds.eight.src = "card-images/diamond-cards/eight-diamond.png";
        this.card_sprites.diamonds.nine.src = "card-images/diamond-cards/nine-diamond.png";
        this.card_sprites.diamonds.ten.src = "card-images/diamond-cards/ten-diamond.png";
        this.card_sprites.diamonds.jack.src = "card-images/diamond-cards/jack-diamond.png";
        this.card_sprites.diamonds.queen.src = "card-images/diamond-cards/queen-diamond.png";
        this.card_sprites.diamonds.king.src = "card-images/diamond-cards/king-diamond.png";
    }
}
