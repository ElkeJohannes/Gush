// When the DOM has finished loading, start loading the basics for the game.
document.addEventListener("DOMContentLoaded", function () {

    // Button event handlers
    $('#play-button').click(function () {
        playGame(3, 250);
    });

    loadShapes();
});

// -------- Shapes functions ------
function loadShapes() {
    let shapes = $('#game-container')[0];
    for (i = 1; i < 10; i++) {
        shapes.innerHTML += `
            <img src="assets/images/shape${i}.png" class="shape" id="shape${i}" />`
    }
}

function setShapesToShow(numOfShapes) {
    // Generate the correct answers and store them
    // inside the array of this object for later use
    let i = 0;
    let randomNum = 0;
    let ShapesToShow = [];
    do {
        // Generate a new random number each loop
        randomNum = generateNewRandomNumber(randomNum);
        // Add the number to the array
        ShapesToShow.push(randomNum);
        i++;
    } while (i < numOfShapes)

    return ShapesToShow;
}

function highlightShapes(numOfShapes, speed, shapesToShow) {
    // Set an interval to show the corresponding shapes
    // Start by setting up some variables that we'll be needing
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
            // Select the right element using jQuery and add the class
            shapeID = '#shape' + String(shapesToShow[counter]);
            $(shapeID).addClass(speedString);
        } else {
            // We're done, stop the interval
            clearInterval(interval);

            // Now get ready for the user to input the answers
            prepareForAnswers(shapesToShow);
        }
        // Increment the counter so we know when to stop
        counter++;
    }, speed);
}
// -------- / Shapes functions ------


function playGame(numOfShapes, speed) {
    // Load up the shapes that will be shown
    let shapes = setShapesToShow(numOfShapes);
    // Start highlighting those shapes
    highlightShapes(numOfShapes, speed, shapes);
}

function displayResults(){
    // Make results pane visible
    let resultsPane = $('#results-pane');
    resultsPane.removeClass('hidden');

    // Retrieve the results from the div
    let results = $('#settings').html();
    results = results.split(',');

    // Display the results  in results pane
    resultsPane.html(`
    Congratulations!!!
    
    You guessed: ${results[0]} shapes right.
    The game speed was set at: ${results[1]} miliseconds.`);
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

// -------- Answer functions ------
function prepareForAnswers(shapes) {
    // Add event listeners to all the shapes so user
    // can click on them
    $('.shape').click(function () {
        checkAnswer(this.id);
    });

    // Hide play button
    $('#play-button').addClass('hidden');

    // Write down the correct answers
    $('#answers').html(`${shapes}`);
}

function checkAnswer(shape) {
    // Get all the answers from the div
    // Take out the first one to check against 
    // the shape that was clicked
    let answers = $('#answers').html();
    answers = answers.split(',');
    let correctAnswer = Number(answers[0]);

    // Get the number from the shape
    // that was clicked
    let shapeID = Number(shape.slice(5));

    if (shapeID === correctAnswer) {
        // Correct answer given
        // Remove the correct(first) answer from the array
        answers.shift();
        // Check if all the correct answers are given
        if (answers.length === 0) {
            // Start a new game, incrementing the speed 
            // and / or number of shapes
            console.log('Array is now empty');
        } else {
            // If not, then write the array back to the div
            $('#answers').html(`${answers}`);
        }
    } else {
        // Wrong answer given
        displayResults();
    }
}
// -------- / Answer functions ------