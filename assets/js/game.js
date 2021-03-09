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

    // Set an interval to change the classes of the shapes
    let i = 0;
    let interval = setInterval(setClass, speed)
    
    let shapeID;
    let speedString = `speed${String(speed)}`;
    function setClass() {
        i++;
        // First remove the class from the previous run
        $(shapeID).removeClass(speedString);
        //  Now if we have not reached the desired number of shapes shown yet;
        if (i <= numOfShapes) {
            // Then select a random shape and add the class
            shapeID = '#shape' + String(Math.floor(Math.random() * 9) + 1);
            $(shapeID).addClass(speedString);
        } else {
            // If we are done, stop the interval
            clearInterval(interval);
        }
    }
}