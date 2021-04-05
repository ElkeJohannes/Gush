// When the DOM has finished loading, start loading the basics for the game.
document.addEventListener("DOMContentLoaded", function () {

    // Add events to play buttons and overlay
    $('#play-button').click(playGame);
    $('.play-again-button').click(playAgain);
    $('#overlay').click(function () {
        $(this).addClass('hidden');
    })
    $('#highscores-button').click(getHighscores);

    loadShapes();
});

// -------- Shapes functions ------
function loadShapes() {
    let shapes = $('#shape-container')[0];
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

function highlightShapes(shapesToShow) {
    // Set an interval to show the corresponding shapes
    // Retrieve the current game settings
    let speed = $('#speed').html();
    let shapes = $('#shapes').html();
    // Now set up some variables that we'll be needing
    let counter = 0;
    let shapeID = '';
    let speedString = `speed${speed}`;

    // Start running the game sound
    let playingSound = new Audio('assets/audio/playing.wav');
    playingSound.play();

    let intervalSpeed;
    switch (speed) {
        case 1:
            intervalSpeed = 1000
            break;
        case 2:
            intervalSpeed = 750
            break;
        case 3:
            intervalSpeed = 500
            break;
        case 4:
            intervalSpeed = 250
            break;
        case 5:
            intervalSpeed = 150
            break;
        case 6:
            intervalSpeed = 100
            break;
        default:
            intervalSpeed = 1000
            break;
    }

    // Start the interval
    let interval = setInterval(function () {
        // Check if we've processed the required amount of shapes
        if (counter < shapes) {
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

            // Remove the class from the last shape shown
            $(shapeID).removeClass(speedString);

            // Stop the game sound
            playingSound.pause();

            // Now get ready for the user to input the answers
            prepareForAnswers(shapesToShow);
        }
        // Increment the counter so we know when to stop
        counter++;
    }, intervalSpeed);
}
// -------- / Shapes functions ------

// -------- Game state functions ------
function setGameSettings() {
    // Retrieve the current game settings
    let speed = Number($('#speed').html());
    let shapes = Number($('#shapes').html());

    // Set the new game settings
    // Number of shapes always just gets incremented by one
    // Speed is incremented at set shape numbers
    shapes += 1;
    switch (shapes) {
        case 3:
            speed = 1;
            break;
        case 5:
            speed = 2;
            break;
        case 7:
            speed = 3;
            break;
        case 9:
            speed = 4;
            break;
        case 11:
            speed = 5;
            break;
        case 13:
            speed = 6;
            break;
    }

    // Now write the new values back to the dom
    $('#speed').html(`${speed}`);
    $('#shapes').html(`${shapes}`);
}

function playGame() {
    // Hide play button and overlay
    $('#play-button').addClass('hidden');
    $('#overlay').addClass('hidden');

    // Setup for a new round
    prepareNewRound();

    // Update the game settings
    setGameSettings();

    // Retrieve the game settings
    let shapes = $('#shapes').html();

    // Load up the shapes that will be shown
    let shapesToHighlight = setShapesToShow(shapes);

    // Start highlighting those shapes
    highlightShapes(shapesToHighlight);
}

function displayResults() {
    // Show the overlay
    $('#overlay').removeClass('hidden');
    // Make results pane visible
    let resultsPane = $('#results-pane');
    resultsPane.removeClass('hidden');

    // Retrieve the current settings
    let speed = Number($('#speed').html());
    let shapes = $('#shapes').html();

    // Retrieve the score
    let score = $('#score').html();
    setCookie('score', score);

    // Display the results  in results pane
    resultsPane.html(`
    <p>Aaah wrong answer :(</P>    
    <p>Well done though!<br>
    You guessed: ${score} shapes right.<br>
    The game speed was: ${speed} , 
    showing ${shapes} shapes.</p>
    <button class='game-control play-again-button' onclick='playAgain()'>Play again!</button>
    `);
}

function prepareNewRound() {
    // Empty the div containing the correct answers
    $('#answers').html('');

    // Remove the click function from the shapes
    // Credit on how to do this:
    // The Electric toolbox
    // https://electrictoolbox.com/jquery-assign-remove-click-handler/
    $('.shape').unbind('click');

    // Increment the round number
    let currentRound = Number($('#current-round-counter').html());
    currentRound++;
    $('#current-round-counter').html(`${currentRound}`);
}

function playAgain() {
    // Reset the settings
    $('#speed').html('1');
    $('#shapes').html('2');

    // Reset the score
    $('#score').html('0');

    // Reset the round number
    $('#current-round-counter').html('0');

    // Now start playing normally
    playGame();
}
// -------- / Game state functions ------

// -------- Answer functions ------
function prepareForAnswers(shapes) {
    // Add event listeners to all the shapes so user
    // can click on them
    $('.shape').click(function () {
        checkAnswer(this.id);
    });

    // Write down the correct answers
    $('#answers').html(`${shapes}`);
}

function checkAnswer(shape) {
    // Get all the answers from the div
    // Take out the first one to check against 
    // the shape that was clicked
    let answers = $('#answers').html().split(',');
    let correctAnswer = Number(answers[0]);

    // Get the number from the shape
    // that was clicked
    let shapeID = Number(shape.slice(5));

    if (shapeID === correctAnswer) {
        // Correct answer given
        // Increment the score counter
        let score = Number($('#score').html());
        score++;
        $('#score').html(score);

        // Remove the correct(first) answer from the array
        answers.shift();

        // Play confirming sound
        let correctSound = new Audio('assets/audio/correct.wav');
        correctSound.play();

        // Light up the background in green for a second
        // to provide visual feedback that the correct answer was given
        $(`#${shape}`).addClass('correct');
        setTimeout(function () {
            $(`#${shape}`).removeClass('correct');
        }, 400)

        // Check if all the correct answers are given
        if (answers.length === 0) {
            // Start a new round
            playGame();
        } else {
            // If not, then write the array back to the div
            $('#answers').html(`${answers}`);
        }
    } else {
        // Wrong answer given
        // Play losing sound
        let losingSound = new Audio('assets/audio/lose.wav');
        losingSound.play();

        // Display results
        displayResults();
    }
}
// -------- / Answer functions ------

// -------- Helper functions ------
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

function getHighscores() {
    getCookie('score');
}

function setCookie(cookieName, value, ttl) {
    // Create a date object of the current date
    // + the specified number of days (time to live)
    let date = addDays(ttl);
    // Create the cookie 
    document.cookie = `${cookieName}=${value};${date.toUTCString()};path=/;SameSite=Lax;`;
}

function getCookie(cookieName) {
    // Get all the cookies
    let cookies = document.cookie.split(';');
    // Get the length of the string we are looking for
    let len = cookieName.length +1;    
    for (cookie of cookies) {
        // Now check each value in the array
        if (cookie.slice(1, len) === cookieName) {
            console.log(`This is the cookie you were looking for: '${cookie.slice(1, len)}'`);
            console.log(`It's value is: '${cookie.slice(len + 1)}'`);
        }
    }
}

function addDays(days) {
    // Genereate new date object outside the if so we can 
    // always return this if days provided is 0
    let date = new Date();
    if (days !== 0 | days !== NaN | days !== null) {
        // Convert the input days to miliseconds
        let miliseconds = days * 24 * 60 * 60 * 1000;
        miliseconds = date.getMilliseconds() + miliseconds;
        // Redeclare the date variable with a new timestamp
        date = new Date(miliseconds);
    }
    // Always return a date object
    return date;
}
// -------- / Helper functions ------