
// Deal 26 Cards to each Player from a Deck of 52 cards.
// Iterate through the turns where each Player plays a Card.
// The Player who played the higher card is awarded a point.
// -Ties result in zero points for both Players.
// After all cards have been played, display the score and declare the winner.

//deck
class Deck {
    constructor() {
        this.deck = [];
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    }
    createDeck() {
        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.ranks.length; j++) {
                this.deck.push({
                    name: `${this.ranks[j]} of ${this.suits[i]}`,
                    value: j + 2
                })

            }

        }
        return this.deck;
    }
    //Fisher-Yates shuffle algorithm
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
}


//playGame
class playWar {
    constructor() {

        this.player1 = {
            name: 'Player1',
            score: 0,
            hand: []
        }
        this.player2 = {
            name: 'Player2',
            score: 0,
            hand: []
        }
    }
    /**
     * Deal 26 cards to each player
     */
    dealCard() {
        let newDeck = new Deck();
        newDeck.createDeck();
        newDeck.shuffleDeck();
        for (let i = 0; i < newDeck.deck.length; i++) {
            if (i % 2 === 0) {
                this.player1.hand.push(newDeck.deck[i]);
            } else {
                this.player2.hand.push(newDeck.deck[i]);
            }
        }
    }
    /**
     * Compare the cards of each player, add a point, and remove the played cards 
     */
    compareCards() {
        if (this.player1.hand[0].value > this.player2.hand[0].value) {
            this.player1.score++;
            console.log('                 Player 1 wins the round');

        } else if (this.player1.hand[0].value < this.player2.hand[0].value) {
            this.player2.score++;
            console.log('                 Player 2 wins the round');

        }
        else {
            console.log('                 Tie: No winner this round');
        }//remove the played cards from the players hand
        this.player1.hand.shift();
        this.player2.hand.shift();


    }
    /**
     * iterates through the rounds, compares the cards and determines the winner or tie
     */
    playGame() {
        let round = 0;
        this.dealCard();
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            console.log(`
                Round ${round + 1}:
                -----------------------
                Player 1 played: ${this.player1.hand[0].name}
                Player 2 played: ${this.player2.hand[0].name}`);
            this.compareCards();
            console.log(`               
                Player1 score: ${this.player1.score}
                Player2 score: ${this.player2.score}
                -------------------------
                `);
            round++;

        }
        this.getWinner();
    }
    /**
     * Determine the winner of the game
     */
    getWinner() {
        if (this.player1.score > this.player2.score) {
            console.log('Player 1 wins!');
        } else if (this.player1.score < this.player2.score) {
            console.log('Player 2 wins!');
        } else {
            console.log('Tie Game! ran out of cards');
        }
    }

}
playGame = new playWar();
playGame.playGame();
