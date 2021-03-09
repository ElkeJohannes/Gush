// When the DOM has finished loading, start loading the basics for the game.
document.addEventListener("DOMContentLoaded", function () {
    // Button event handlers
    $('.play-button').click(playGame);
    
    loadShapes();
});

function loadShapes(){
    let shapes = $('.game-container')[0];
    console.log(shapes);
    for(i = 1;i < 10; i++){
        shapes.innerHTML += `
            <img src="assets/images/shape${i}.png" class="shape" id="shape${i}" />`
    }
}

function playGame(){
    // Generate a random ID to target one of the shapes
    // Additionally set the speed for the transition
    shapeID = '#shape' + String(Math.floor(Math.random() * 9) + 1);
    speed = 'speed1';

    // Remove all previous speeds from all shapes
   for(i = 1; i < 7; i++){
       $('.shape').removeClass(`speed${i}`);
   }

    $(shapeID).addClass(speed);
}