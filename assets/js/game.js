// When the DOM has finished loading, start loading the basics for the game.
document.addEventListener("DOMContentLoaded", function () {

    // Add events to play buttons and overlay
    $('#play-button').click(playAgain);
    $('.play-again-button').click(playAgain);
    $('.highscores-button').click(displayHighscores);
    $('.tutorial-button').click(playTutorial);
    $('.close-button').click(resetOverlay);
    $('#highscore-form').on('submit', setHighscores);

    loadShapes();
    checkFirstVisit();
});

// -------- Shapes functions ------
function loadShapes() {
    // Load in 9 shapes using a loop
    // Using a function allows for easy changing of number of shapes
    // In a future release
    let shapes = $('#shape-container-inner')[0];
    let shapesElements = [];
    for (i = 1; i < 10; i++) {
        shapesElements.push(`<img src="assets/images/shape${i}.png" class="shape" id="shape${i}" />`);
    }
    shapes.innerHTML = shapesElements.join('');
}

function setShapesToShow(numOfShapes) {
    // Generate the correct answers and store them
    // inside the array of this object for later use
    let count = 0;
    let currentRandomNum = 0;
    let shapesToShow = [];
    do {
        const excludedNum = currentRandomNum;
        currentRandomNum = generateNewRandomNum(excludedNum);
        shapesToShow.push(currentRandomNum);
        count++;
    } while (count < numOfShapes)

    // Write down the correct answers
    $('#answers').html(`${shapesToShow}`);

    return shapesToShow;
}

function highlightShapes(shapesToShow) {
    // Get the current game speed and number of shapes to show
    // Then highlight the appropiate number of shapes
    // By temporarily applying the game speed as a css class
    const numberOfShapes = $('#shapes').html();
    // const gameSpeed = Number($('#speed').html()) + 3;
    const gameSpeed = Number($('#speed').html());
    const gameSpeedString = `speed${gameSpeed}`;
    let counter = 0;
    let shapeID = '';

    let gameIsRunningSound = $('#playing-sound')[0];
    gameIsRunningSound.currentTime = 0;
    gameIsRunningSound.play();

    let interval = setInterval(function () {
        // Each interval, remove the css class from the previous tick
        // Then get the new shape and add the class
        if (shapeID !== '') {
            $(shapeID).removeClass(gameSpeedString);
        }
        if (counter < numberOfShapes) {
            shapeID = '#shape' + String(shapesToShow[counter]);
            $(shapeID).addClass(gameSpeedString);
        } else {
            clearInterval(interval);
            gameIsRunningSound.pause();
            enableAnswers();
        }
        counter++;
    }, 1000);
}

// -------- Game state functions ------
function setGameSettings() {
    // Set the new game settings
    // Number of shapes always gets incremented by one
    // Speed is incremented every 3 shapes
    let gameSpeed = Number($('#speed').html());
    let numberOfShapes = Number($('#shapes').html());
    numberOfShapes++;

    if (numberOfShapes % 3 === 0) {
        gameSpeed++;
    }

    $('#speed').html(gameSpeed);
    $('#shapes').html(numberOfShapes);
}

function playGame() {
    // Run the game by loading the settings and shapes,
    // and hiding the overlay with the play button
    prepareNewRound();
    setGameSettings();
    const numberOfShapes = $('#shapes').html();
    let shapesToHighlight = setShapesToShow(numberOfShapes);
    highlightShapes(shapesToHighlight);
    $('.overlay-item').addClass('hidden');
}

function playAgain() {
    // Reset the game settings, then start playing normally
    const defaultGameSpeed = 1;
    const defaultNumberofShapes = 1;
    const initialGameScore = 0;
    const initialGameLevel = 0;
    $('#speed').html(defaultGameSpeed);
    $('#shapes').html(defaultNumberofShapes);
    $('#score').html(initialGameScore);
    $('#current-level').html(initialGameLevel);

    playGame();
}

function displayResults() {
    // Show the results pane, with filled in highscore
    $('#overlay').removeClass('hidden');
    $('#results-pane').removeClass('hidden');

    const highscore = $('#score').html();
    $('#highscore').html(highscore);
}

function prepareNewRound() {
    // Make sure the player can't click on a shape during 
    // the highlighting, and increment the level counter
    disableAnswers();

    let currentLevel = Number($('#current-level').html());
    currentLevel++;
    $('#current-level').html(currentLevel);
}

function playTutorial() {
    // Enable overlay with the tutorial visible
    $('#overlay').removeClass('hidden');
    $('#tutorial').removeClass('hidden');
}

// -------- Answer functions ------
function enableAnswers() {
    // Add event listeners and hover effect to all the shapes,
    // so user can click on them
    $('.shape').click(function () {
        checkAnswer(this.id);
    }).addClass('clickableShape');
}

function disableAnswers() {
    // Remove the click function and hover effect from the shapes
    $('.shape').unbind('click').removeClass('clickableShape');
}

function checkAnswer(shape) {
    // Get all the answers from the div
    // Take out the first one to check against 
    // the shape that was clicked
    let answersArray = $('#answers').html().split(',');
    const correctAnswer = Number(answersArray[0]);
    const shapeID = Number(shape.slice(5));

    if (shapeID === correctAnswer) {
        correctAnswerGiven(shape);
        answersArray.shift();
        if (answersArray.length === 0) {
            playGame();
        } else {
            $('#answers').html(`${answersArray}`);
        }
    } else {
        wrongAnswerGiven();
    }
}

function correctAnswerGiven(shape) {
    // Increment the score counter
    // And provide audio and visual feedback for the player
    let score = Number($('#score').html());
    score++;
    $('#score').html(score);

    const correctSound = new Audio('assets/audio/correct.wav');
    correctSound.play();

    $(`#${shape}`).addClass('correct');
    setTimeout(function () {
        $(`#${shape}`).removeClass('correct');
    }, 400);
}

function wrongAnswerGiven() {
    // Give feedback to player and go to results
    let losingSound = new Audio('assets/audio/lose.wav');
    losingSound.play();
    disableAnswers();
    displayResults();
}

// -------- Highscore functions ------
function displayHighscores() {
    // Redefine the highscores table
    // Fetch the highscores, and add them to that table
    $('#highscores').html(`
    <tr id='skip-sort'>
      <th>#</th>  
      <th>Name</th>
      <th>Score</th>
    </tr> `);

    const highscoreObject = getHighscores();
    addHighscoresToTable(highscoreObject);

    $('.overlay-item').addClass('hidden');
    $('#overlay').removeClass('hidden');
    $('#highscores-pane').removeClass('hidden');
}

function getHighscores() {
    // Get the cookies containing the highscores and
    // store the data into 2 array's in an object
    let scoreNumbers = getCookie('Highscore-numbers');
    let scoreNames = getCookie('Highscore-names');

    // 'Check for undefined' credit to:
    // Flaviocopes
    // https://flaviocopes.com/how-to-check-undefined-property-javascript/
    if (typeof (scoreNumbers) === 'undefined') {
        return {
            arrayNumbers: [],
            arrayNames: []
        };
    } else {
        scoreNumbers = scoreNumbers.split(',');
        scoreNames = scoreNames.split(',');
        return {
            arrayNumbers: scoreNumbers,
            arrayNames: scoreNames
        };
    }
}

function setHighscores(e) {
    // Add the submitted highscores to the existing ones
    // Go the the highscores screen, and highlight the new entry
    e.preventDefault();

    const score = $('#score').html();
    const name = $('#name').val();
    let highscoreObject = getHighscores();
    highscoreObject.arrayNumbers.push(score);
    highscoreObject.arrayNames.push(name);

    if (highscoreObject.arrayNumbers.length > 1) {
        highscoreObject = sortHighscores(highscoreObject.arrayNumbers, highscoreObject.arrayNames);
    }

    const cookieExpirationTime = 365;
    let cookieName = 'Highscore-numbers';
    setCookie(cookieName, highscoreObject.arrayNumbers, cookieExpirationTime);
    cookieName = 'Highscore-names';
    setCookie(cookieName, highscoreObject.arrayNames, cookieExpirationTime);

    displayHighscores();
    highlightHighscore(score, name, highscoreObject);
}

function addHighscoresToTable(highscoresObject) {
    // Iterate through the received array and create a new array with
    // all table entries. Then pass that to the DOM.
    let highscores = [];
    for (i = 0; i < highscoresObject.arrayNumbers.length; i++) {
        const name = highscoresObject.arrayNames[i];
        const score = highscoresObject.arrayNumbers[i];
        const rank = i + 1;
        highscores.push(`
        <tr id=${rank}>
            <td>${rank}</td>
            <td>${name}</td>
            <td>${score}</td>
        </tr >`);
    };
    $('#highscores').append(highscores);
}

function highlightHighscore(score, name, highscores) {
    // Find the new highscore and for 1 sec add the highlight class to it
    for (i = 0; i < highscores.arrayNumbers.length; i++) {
        if (score === highscores.arrayNumbers[i] && name === highscores.arrayNames[i]) {
            const rank = i + 1;
            const tableRowID = 'tr#' + rank;
            $(tableRowID).addClass('highlight-score');
        }
    }
    setTimeout(function () {
        $(`.highlight-score`).removeClass('highlight-score');
    }, 1000);
}

function sortHighscores(arrayNumbers, arrayNames) {
    // Merge the arrays together, and sort the by the scores array
    // If there's more than 10 after this, pop the lowest one out
    let mergeArray = [];
    for (i = 0; i < arrayNumbers.length; i++) {
        mergeArray.push([arrayNumbers[i], arrayNames[i]]);
    }
    mergeArray.sort(function (a, b) { return Number(b[0]) - Number(a[0]) });

    for (i = 0; i < mergeArray.length; i++) {
        arrayNumbers[i] = mergeArray[i][0];
        arrayNames[i] = mergeArray[i][1];
    }

    if (arrayNumbers.length > 10) {
        arrayNumbers.pop();
        arrayNames.pop();
    }

    // Credit to the return object idea from:
    // https://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript
    return {
        arrayNumbers: arrayNumbers,
        arrayNames: arrayNames
    };
}

// -------- Helper functions ------
function generateNewRandomNum(oldNum) {
    // Create a new random number between 1 and 9
    // Ensure this is a different number from the one inputted.
    const oldNumber = Number(oldNum);
    let newNumber;    
    let numberCheck = false;

    // Credit to using the Number.isFinite() method for checking:
    // Marcus Sanatan
    // https://stackabuse.com/javascript-check-if-variable-is-a-number/
    if (Number.isFinite(oldNumber)) {
        do {
            newNumber = Math.floor(Math.random() * 9) + 1
            if (newNumber !== oldNumber) {
                numberCheck = true;
            }
        } while (numberCheck == false);

        return newNumber;
    } else {
        console.log(`Wrong input supplied. Given: ${oldNumber}`);
    }
}

function setCookie(cookieName, value, ttl) {
    // Create a cookie with a dynamically set expiry date.
    let cookieExpiryDate = addDays(ttl);
    document.cookie = `${cookieName}=${value};expires=${cookieExpiryDate.toUTCString()};path=/;SameSite=Lax;`;
}

function getCookie(cookieName) {
    // Get all cookies as an array, loop through and return
    // the one with the name that was passed.
    const cookies = document.cookie.split(';');
    const cookieNamelength = cookieName.length;
    for (cookie of cookies) {
        cookie = cookie.trim();
        const cookieSlice = cookie.slice(0, cookieNamelength);
        if (cookieSlice === cookieName) {
            return cookie.slice(cookieNamelength + 1);
        }
    }
}

function addDays(days) {
    // Generate new date object and optionally increase it
    // with the number of days passed in.
    let expiryDate = new Date();
    const numberOfDays = Number(days);
    if (Number.isFinite(numberOfDays) && numberOfDays > 0) {
        let dateInMiliseconds = numberOfDays * 24 * 60 * 60 * 1000;
        dateInMiliseconds = expiryDate.getTime() + dateInMiliseconds;
        expiryDate = new Date(dateInMiliseconds);
    }
    return expiryDate;
}

function resetOverlay() {
    // Hide all overlay items, except the overlay itself 
    // and the play button
    $('.overlay-item').addClass('hidden');
    $('#overlay').removeClass('hidden');
    $('#play-button').removeClass('hidden');
}

function checkFirstVisit() {
    // Try to get the cookie. If it doesn't exist, create it
    // and run the tutorial.
    const firstVisitCookie = getCookie('firstVisit');

    // if (typeof (firstVisitCookie) === 'undefined') {
    //     const cookieName = 'firstVisit';
    //     const cookieValue = 'true';
    //     const cookieExpirationTime = 365;
    //     setCookie(cookieName, cookieValue, cookieExpirationTime);
    //     playTutorial();
    // } else {
        $('#play-button').removeClass('hidden');
    // }
}