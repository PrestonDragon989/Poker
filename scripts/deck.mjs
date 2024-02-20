class CardDeck {
    constructor(size) {
        // Deck size
        this.size = size;

        // Card Sprites
        this.cardSprites = {
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
        this.allCards = [
            [1, "diamond", this.cardSprites.diamonds.ace], [2, "diamond", this.cardSprites.diamonds.two], [3, "diamond", this.cardSprites.diamonds.three], [4, "diamond", this.cardSprites.diamonds.four], [5, "diamond", this.cardSprites.diamonds.five], [6, "diamond", this.cardSprites.diamonds.six], [7, "diamond", this.cardSprites.diamonds.seven], [8, "diamond", this.cardSprites.diamonds.eight], [9, "diamond", this.cardSprites.diamonds.nine], [10, "diamond", this.cardSprites.diamonds.ten], [11, "diamond", this.cardSprites.diamonds.jack], [12, "diamond", this.cardSprites.diamonds.queen], [13, "diamond", this.cardSprites.diamonds.king],
            [1, "spade", this.cardSprites.spades.ace], [2, "spade", this.cardSprites.spades.two], [3, "spade", this.cardSprites.spades.three], [4, "spade", this.cardSprites.spades.four], [5, "spade", this.cardSprites.spades.five], [6, "spade", this.cardSprites.spades.six], [7, "spade", this.cardSprites.spades.seven], [8, "spade", this.cardSprites.spades.eight], [9, "spade", this.cardSprites.spades.nine], [10, "spade", this.cardSprites.spades.ten], [11, "spade", this.cardSprites.spades.jack], [12, "spade", this.cardSprites.spades.queen], [13, "spade", this.cardSprites.spades.king],
            [1, "heart", this.cardSprites.hearts.ace], [2, "heart", this.cardSprites.hearts.two], [3, "heart", this.cardSprites.hearts.three], [4, "heart", this.cardSprites.hearts.four], [5, "heart", this.cardSprites.hearts.five], [6, "heart", this.cardSprites.hearts.six], [7, "heart", this.cardSprites.hearts.seven], [8, "heart", this.cardSprites.hearts.eight], [9, "heart", this.cardSprites.hearts.nine], [10, "heart", this.cardSprites.hearts.ten], [11, "heart", this.cardSprites.hearts.jack], [12, "heart", this.cardSprites.hearts.queen], [13, "heart", this.cardSprites.hearts.king],
            [1, "club", this.cardSprites.clubs.ace], [2, "club", this.cardSprites.clubs.two], [3, "club", this.cardSprites.clubs.three], [4, "club", this.cardSprites.clubs.four], [5, "club", this.cardSprites.clubs.five], [6, "club", this.cardSprites.clubs.six], [7, "club", this.cardSprites.clubs.seven], [8, "club", this.cardSprites.clubs.eight], [9, "club", this.cardSprites.clubs.nine], [10, "club", this.cardSprites.clubs.ten], [11, "club", this.cardSprites.clubs.jack], [12, "club", this.cardSprites.clubs.queen], [13, "club", this.cardSprites.clubs.king]
        ];        

        // Playing Decks
        this.totalPlayingDeck;
        this.currentDeck;

        // Player Hand
        this.playerHand = [];

        // NPC Hands
        this.NpcHands = [];

        // Cards currently on the table
        this.tableCards = [];

        // Loading Sprites
        this.loadCardSprites();
    }

    // Card Management functions (set deck, shuffle deck, deal cards, etc. . .)
    setCurrentDeck() {
        this.totalPlayingDeck = [];
        for (let i = 0; i < this.size; i++) {
            this.totalPlayingDeck = this.totalPlayingDeck.concat(this.allCards);
        }
        this.currentDeck = this.totalPlayingDeck;
    }

    shuffleDeck() {
        // Reseting player hands
        this.playerHand = [];

        // Reseting deck
        this.currentDeck = this.totalPlayingDeck;

        // Shuffling Current Deck
        for (let i = this.currentDeck.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [this.currentDeck[i], this.currentDeck[r]] = [this.currentDeck[r], this.currentDeck[i]];
        }
    }

    dealCard() {
        // Dealing card, and removing it from the current deck
        const cardDealt = this.currentDeck[0];
        this.currentDeck.splice(0, 1);
        return cardDealt;
    }

    // Deal player and table cards
    dealPlayerCards() {
        for (let i = 0; i < 2; i++) {
            this.playerHand.push(this.dealCard());
        }
    }

    dealNpcCards() {
        for (let i = 0; i < 4; i++) {
            let hand = [];
            for (let i = 0; i < 2; i++) {
                hand.push(this.dealCard());
            }
            this.NpcHands.push(hand);
        }
    }

    dealTableCards(numCards = 1) {
        for (let i = 0; i < numCards; i++) {
            this.tableCards.push(this.dealCard());
        }
    }

    // Setting up Card Sprites
    loadCardSprites() {
        // Loading Club Sprites
        this.cardSprites.clubs.ace.src = "card-images/club-cards/ace-club.png";
        this.cardSprites.clubs.two.src = "card-images/club-cards/two-club.png";
        this.cardSprites.clubs.three.src = "card-images/club-cards/three-club.png";
        this.cardSprites.clubs.four.src = "card-images/club-cards/four-club.png";
        this.cardSprites.clubs.five.src = "card-images/club-cards/five-club.png";
        this.cardSprites.clubs.six.src = "card-images/club-cards/six-club.png";
        this.cardSprites.clubs.seven.src = "card-images/club-cards/seven-club.png";
        this.cardSprites.clubs.eight.src = "card-images/club-cards/eight-club.png";
        this.cardSprites.clubs.nine.src = "card-images/club-cards/nine-club.png";
        this.cardSprites.clubs.ten.src = "card-images/club-cards/ten-club.png";
        this.cardSprites.clubs.jack.src = "card-images/club-cards/jack-club.png";
        this.cardSprites.clubs.queen.src = "card-images/club-cards/queen-club.png";
        this.cardSprites.clubs.king.src = "card-images/club-cards/king-club.png";

        // Loading Spade Sprites
        this.cardSprites.spades.ace.src = "card-images/spade-cards/ace-spade.png";
        this.cardSprites.spades.two.src = "card-images/spade-cards/two-spade.png";
        this.cardSprites.spades.three.src = "card-images/spade-cards/three-spade.png";
        this.cardSprites.spades.four.src = "card-images/spade-cards/four-spade.png";
        this.cardSprites.spades.five.src = "card-images/spade-cards/five-spade.png";
        this.cardSprites.spades.six.src = "card-images/spade-cards/six-spade.png";
        this.cardSprites.spades.seven.src = "card-images/spade-cards/seven-spade.png";
        this.cardSprites.spades.eight.src = "card-images/spade-cards/eight-spade.png";
        this.cardSprites.spades.nine.src = "card-images/spade-cards/nine-spade.png";
        this.cardSprites.spades.ten.src = "card-images/spade-cards/ten-spade.png";
        this.cardSprites.spades.jack.src = "card-images/spade-cards/jack-spade.png";
        this.cardSprites.spades.queen.src = "card-images/spade-cards/queen-spade.png";
        this.cardSprites.spades.king.src = "card-images/spade-cards/king-spade.png";

        // Heart Card Sources
        this.cardSprites.hearts.ace.src = "card-images/heart-cards/ace-heart.png";
        this.cardSprites.hearts.two.src = "card-images/heart-cards/two-heart.png";
        this.cardSprites.hearts.three.src = "card-images/heart-cards/three-heart.png";
        this.cardSprites.hearts.four.src = "card-images/heart-cards/four-heart.png";
        this.cardSprites.hearts.five.src = "card-images/heart-cards/five-heart.png";
        this.cardSprites.hearts.six.src = "card-images/heart-cards/six-heart.png";
        this.cardSprites.hearts.seven.src = "card-images/heart-cards/seven-heart.png";
        this.cardSprites.hearts.eight.src = "card-images/heart-cards/eight-heart.png";
        this.cardSprites.hearts.nine.src = "card-images/heart-cards/nine-heart.png";
        this.cardSprites.hearts.ten.src = "card-images/heart-cards/ten-heart.png";
        this.cardSprites.hearts.jack.src = "card-images/heart-cards/jack-heart.png";
        this.cardSprites.hearts.queen.src = "card-images/heart-cards/queen-heart.png";
        this.cardSprites.hearts.king.src = "card-images/heart-cards/king-heart.png";

        // Diamond Card Sources
        this.cardSprites.diamonds.ace.src = "card-images/diamond-cards/ace-diamond.png";
        this.cardSprites.diamonds.two.src = "card-images/diamond-cards/two-diamond.png";
        this.cardSprites.diamonds.three.src = "card-images/diamond-cards/three-diamond.png";
        this.cardSprites.diamonds.four.src = "card-images/diamond-cards/four-diamond.png";
        this.cardSprites.diamonds.five.src = "card-images/diamond-cards/five-diamond.png";
        this.cardSprites.diamonds.six.src = "card-images/diamond-cards/six-diamond.png";
        this.cardSprites.diamonds.seven.src = "card-images/diamond-cards/seven-diamond.png";
        this.cardSprites.diamonds.eight.src = "card-images/diamond-cards/eight-diamond.png";
        this.cardSprites.diamonds.nine.src = "card-images/diamond-cards/nine-diamond.png";
        this.cardSprites.diamonds.ten.src = "card-images/diamond-cards/ten-diamond.png";
        this.cardSprites.diamonds.jack.src = "card-images/diamond-cards/jack-diamond.png";
        this.cardSprites.diamonds.queen.src = "card-images/diamond-cards/queen-diamond.png";
        this.cardSprites.diamonds.king.src = "card-images/diamond-cards/king-diamond.png";
    }
}
export default CardDeck;