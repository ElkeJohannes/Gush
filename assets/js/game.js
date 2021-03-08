// When the DOM has finished loading, start loading the basics for the game.
document.addEventListener("DOMContentLoaded", function () {
    loadShapes();
});

function loadShapes(){
    let shapes = $('.game-container')[0];
    console.log(shapes);
    for(i = 1;i < 10; i++){
        shapes.innerHTML += `
            <img src="assets/images/shape${i}.png" />`
    }
}