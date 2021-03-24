class Game {

    constructor() {
        this.shapesHighlighted = [];
        this.randomNum = 0;
        this.speed = 1000;
        this.numOfShapes = 3;
    }

    setShapesToShow() {
        // Generate the correct answers and store them
        // inside the array of this object for later use
        let i = 0;
        do {
            // Generate a new random number each loop
            this.randomNum = generateNewRandomNumber(this.randomNum);
            // Add the number to the array
            this.shapesHighlighted.push(this.randomNum);
            i++;
        } while (i < this.numOfShapes)

        console.log(this.shapesHighlighted);
    }

    highlightShapes() {
        // Set an interval to show the corresponding shapes
        // Start by setting up some variables that we'll be needing
        let shapesToShow = this.shapesHighlighted;
        let speed = this.speed;
        let numOfShapes = this.numOfShapes;
        let counter = 0;
        let shapeID = '';
        let speedString = `speed${String(speed)}`;

        // Start the interval
        let interval = setInterval(function () {
            // Check if we've processed the required amount of shapes
            if (counter < numOfShapes) {
                // Remove the class from the previous shape shown
                if (shapeID !== '') {
                    $(shapeID).removeClass(speedString);
                }

                // Add the identifier to the number
                // Select the right element using jQuery
                // Add the class
                shapeID = '#shape' + String(shapesToShow[counter]);
                $(shapeID).addClass(speedString);
            } else {
                // We're done, stop the interval
                clearInterval(interval);

                // Now get ready for the user to input the answers
                prepareForAnswers();
            }
            // Increment the counter so we know when to stop
            counter++;
        }, speed);
    }
}

// When the DOM has finished loading, start loading the basics for the game.
document.addEventListener("DOMContentLoaded", function () {

    // Button event handlers
    $('#play-button').click(playGame);

    loadShapes();
});

function loadShapes() {
    let shapes = $('#game-container')[0];
    for (i = 1; i < 10; i++) {
        shapes.innerHTML += `
            <img src="assets/images/shape${i}.png" class="shape" id="shape${i}" />`
    }
}

function playGame() {
    // Create instance of Game Class
    // Inside of this object will be our running game info
    let game = new Game();
    game.setShapesToShow();
    game.highlightShapes();

    // Remove the click function from the shapes
}

function generateNewRandomNumber(oldNum) {
    // Create a new random number between 1 and 9
    // ensure this is a different number from the one inputted by doing
    // a do while loop until we have a different number. 
    let newNum;
    let numCheck = false;

    // Only try to process if the input supplied is a number
    // Credit to using the Number.isFinite() method for checking goes to:
    // Marcus Sanatan
    // https://stackabuse.com/javascript-check-if-variable-is-a-number/
    if (Number.isFinite(Number(oldNum)) || Number(oldNum) === 0) {
        do {
            newNum = Math.floor(Math.random() * 9) + 1
            if (newNum !== oldNum) {
                numCheck = true;
            }
        } while (numCheck == false);

        return newNum;
    } else {
        console.log(`Wrong input supplied. Given: ${Number(oldNum)}`);
    }
}

function prepareForAnswers() {
    // Add event listeners to all the shapes so user
    // can click on them
    $('.shape').click(function () {
        addAnswer(this.id);
    });

    // Display the answers-pane to the side 
    // So you know what you chose
    $('#answers-pane').removeClass('hidden');

    // Hide play button
    // Make submit answer button visible
    $('#submit-button').removeClass('hidden');
    $('#play-button').addClass('hidden');
}

function addAnswer(shapeID) {
    // Add to the answers in the text field

    // Call the checkanswer function to see if it's still going well 
    // If not, abort and call failed screen from that function
}

function submitAnswer() {
    // Read the text field containing the answers
    // Read the hidden text field containing the correct answers

    // Compare the above two 
    // Show either succes (--> set highscore) or failed message

    // Hide submit button
    // Make play button visible
}