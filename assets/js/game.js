// When the DOM has finished loading, start loading the basics for the game.
document.addEventListener("DOMContentLoaded", function () {
    // Button event handlers
    $('.play-button').click(playGame);

    loadShapes();
});

function loadShapes() {
    let shapes = $('.game-container')[0];
    console.log(shapes);
    for (i = 1; i < 10; i++) {
        shapes.innerHTML += `
            <img src="assets/images/shape${i}.png" class="shape" id="shape${i}" />`
    }
}

function playGame() {
    // Set the speed and the number of shapes to show
    let speed = 1000;
    let numOfShapes = 3;

    // Highlight the shapes using another function
    highlightShapes(speed, numOfShapes);

    // Remove the click function from the shapes
}

function highlightShapes(speed, numOfShapes) {
    // Set an interval to change the classes of the shapes
    let i = 0;
    let interval = setInterval(setClass, speed)

    let shapesHighlighted = [];
    let shapeID = "";
    let speedString = `speed${String(speed)}`;
    function setClass() {
        i++;
        // First remove the class from the previous run
        // (if there is one)
        if(shapeID !== ""){
            $(shapeID).removeClass(speedString);
        } 

        //  Now if we have not reached the desired number of shapes highlighted yet:
        if (i <= numOfShapes) {
            // Then select a random shape by generating a random number
            // Make sure it isn't the same number twice in a row
            // by using a do while until we have different numbers
            let previousNum = Number(shapeID.slice(6));
            let newNum;
            let numCheck = false;
            do {
                newNum = Math.floor(Math.random() * 9) + 1
                if(newNum !== previousNum){
                    numCheck = true;
                }
            } while (numCheck == false);

            // Now add the number to the string
            // Then use that string ID to add the class
            shapeID = '#shape' + String(newNum);
            $(shapeID).addClass(speedString);

            // Add shape highlighted to the array so we can check later
            shapesHighlighted.push(shapeID);
        } else {
            // If we are done, stop the interval
            clearInterval(interval);

            // Now setup the game for providing an answer
            setAnswer(shapesHighlighted);
        }
    }    
}

function setAnswer(shapes){
    // Add event listeners to all the shapes so user
    // can click on them
    
    // Display the answers in a text field to the side for a sec
    // So you know what you chose

    // Hide play button
    // Make submit answer button visible
}

function addAnswer(shapeID){
    // Add to the answers array in the text field

    // Call the checkanswer function to see if it's still going well 
    // If not, abort and call failed screen from that function
}

function submitAnswer(){
    // Read the text field containing the answers
    // Read the hidden text field containing the correct answers

    // Compare the above two 
    // Show either succes (--> set highscore) or failed message

    // Hide submit button
    // Make play button visible
}