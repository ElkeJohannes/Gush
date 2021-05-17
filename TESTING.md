
## <ins>**Testing**</ins>

---

**<details><summary>Table of contents</summary>**
  - [Code validation](#code-validation)
  - [User story tests](#user-story-tests)
  - [Manual testing script](#manual-testing-script)
  - [Feature test scripts](#feature-test-scripts)
  - [Bugs](#bugs)
</details>

---

## &rarr; **Code validation**
- Tested for valid HTML code using [w3 validator](https://validator.w3.org/nu/)<br>
<img src="assets/screenshots/html-validation.png" width="400px" height="200px" alt="Validation tests - HTML">

- Tested for valid CSS code using [Jigsaw validator](https://jigsaw.w3.org/css-validator/)<br>
<img src="assets/screenshots/css-validation.png" width="400px" height="150px" alt="Validation tests - CSS"><br>
    ** There were 5 warnings reported. These are all because I've chosen to use CSS variables.<br>
        <img src="assets/screenshots/css-validation-warnings.png" width="300px" height="150px" alt="Validation tests - CSS validation warnings">

- Tested for valid Javascript using [Jshint](https://jshint.com/)<br>
<img src="assets/screenshots/jshint-validation.png" width="500px" height="250px" alt="Validation tests - Javascript linter">

---

## &rarr; **User story tests**
- I want to receive instructions on how to play the game.
    * When loading the game for the first time, you are presented with a tutorial text and gif.
    <img src="assets/screenshots/user-story-tutorial.png" width="400px" height="300px" alt="User story - Tutorial">
- I want to revisit the instructions, should I feel the need. 
    * There is a button on the bottom right (mobile), or top right (> mobile) labeled 'How to play'. When clicking on this button, the tutorial window will appear again. 

        | <div align="center">Mobile</div> | <div align="center">> Mobile</div> |
        |-|-|
        |<img src="assets/screenshots/user-story-how-to-play-bottom.png" width="200px" height="300px" alt="User story - How to play mobile">|<img src="assets/screenshots/user-story-how-to-play-top.png" width="400px" height="300px" alt="User story - How to play mobile plus">|

- I want to be able to keep track of how I'm doing in the current game.
    * Between the game title and the game area, there is an informational panel. The panel shows you the current game speed, level and your score so far.<br>    
        <img src="assets/screenshots/user-story-game-info.png" width="300px" height="200px" alt="User story - Game info">
- I want to be able to view my highscores.
    * There is a button on the bottom left (mobile), or top right (> mobile) labeled 'View highscores'. When clicking on this button, the highscores window will appear.

        | <div align="center">Mobile</div> | <div align="center">> Mobile</div> |
        |-|-|
        |<img src="assets/screenshots/user-story-highscores-bottom.png" width="200px" height="300px" alt="User story - Highscores mobile">|<img src="assets/screenshots/user-story-highscores-top.png" width="400px" height="300px" alt="User story - Highscores mobile plus">|

- I want to be able to start a new game, after finishing one.
    * When you click on the wrong shape, the game will end and you will be presented with a screen to submit your highscore. You can either choose to submit your score, after which you will be taken to the highscore screen, where there is a play again button:
        <img src="assets/screenshots/user-story-play-again.png" width="200px" height="300px" alt="User story - Play again button">

        Or you can close the submit highscore screen using the (X) close button, in which case you can click on the default Play button:
        <img src="assets/screenshots/user-story-play.png" width="200px" height="300px" alt="User story - Play button">

---

## &rarr; **Manual testing script**
In all below testing actions, it is assumed you have opened the website on **any** device. 

|Test name|Actions|
|-|-|
|<ins>View highscores button</ins>|- Click on the 'View highscores' button <br>- Confirm a window opens, listing highscores|
|<ins>View highscores - Close button</ins>|- Click on the (X) button on the top right of this screen<br>- Confirm the highscores window closes|
|<ins>View highscores - Play again button</ins>|- Click on the 'View highscores' button <br>- Click on the 'Play again' button<br>- Confirm the highscores screen closes, and the game starts playing, highlighting 2 shapes|
|<ins>How to play button</ins>|- Click on the 'How to play' button<br>- Confirm the tutorial window opens, with a gif running|
|<ins>How to play - Close button</ins>|- Click on the (X) button on the top right of this screen<br>- Confirm the tutorial window closes|
|<ins>Play button</ins>|- Click on the play button<br>- Confirm the game starts running, and 2 shapes are highlighted|
|<ins>Sounds - Playing</ins>|- Click on the play button<br>- Confirm music is playing during the highlighting of the shapes<br>- Play through a number of additional rounds<br>- Confirm this music is always playing during the highlighting|
|<ins>Sounds - Correct</ins>|- Click on the play button<br>- Once possible, click on the correct shape<br>- Confirm a confirming sound is played|
|<ins>Sounds - Incorrect</ins>|- Click on the play button<br>- Once possible, click on one of the incorrect shapes<br>- Confirm a game over sound is played|
|<ins>Game results</ins>|- Click on the play button<br>- Once possible, click on on of the incorrect shapes<br>- Confirm the game results window appears|
|<ins>Game results - Close button</ins>|- Click on the play button<br>- Once possible, click on on of the incorrect shapes<br>- Once the Game results window appears, click on the (X) button on the top right of this screen<br>- Confirm the Game results windows closes|
|<ins>Game results - Submit highscore button</ins>|- Click on the play button<br>- Once possible, click on on of the incorrect shapes<br>- Once the Game results window appears, fill any name in and click on the 'Submit highscore' button<br>- Confirm you are taken to the Highscores window, and the name submitted appears|
|<ins>Footer link</ins>|- Click on the name 'Elke Harmanny' in the footer<br>- Confirm you are taken to the website: https://elkejohannes.github.io/online-resume/|

---

## &rarr; **Feature test scripts**
For testing, 2 device types are defined:
- Mobile
    * Any device with a horizontal screen width **smaller** then 567px. This can also be achieved using browser developer tools.
- Mobile+
    * Any device with a horizontal screen width **larger** then 567px

|1|Green dots on Hover|
|-|-|
- Open the website on a **mobile+** device
- Click on the play button
- After the animation finishes, hover the mouse over the individual shapes
- Confirm an outline of green dots appear around the hovered over shape when doing so

|2|Highscores|
|-|-|
- Open the website on **any** device
- Click or tap on the button that says 'View highscores'
- Confirm an overlay appears, with a screen that shows the local highscores

|3|Responsive design|
|-|-|
- Open the website on a **mobile+** device
- Confirm the 'View highscores' and 'How to play' buttons appear at the top right of the game area
- Open the browsers' developer tools (usually F12 on a windows computer)
- Toggle the device toolbar (usually 'Ctrl + shift + M' on a windows computer)
- Set the device width to a **mobile** device size
- Confirm the 'View highscores' and 'How to play' buttons appear below the game area

|4|Tutorial with gif|
|-|-|
- Open the website on **any** device for the first time (alternatively, you can delete the website's cookies)
- Confirm the tutorial is shown before you can start playing a game.

|5|Current game information|
|-|-|
- Open the website on a **mobile** device
- Confirm the Game information is visible centered above the game area
- Start playing a game, by tapping on the 'Play' button
- Tap on 1 correct shape
- Confirm the 'score' counter is incremented by 1
- Correctly finish the round, by clicking on the remaining correct shapes
- Confirm the level increases after finishing each round
- Play through several rounds
- Confirm the speed increases every 3 levels
- Open the website on a **mobile+** device
- Confirm the game information is now visible above the game area, aligned to the left side

---

## &rarr; **Bugs**
1. During a first run of the game, removeClass() would throw an error
    * shapeID is always empty during the first run in the interval (). Added an if statement to only removeClass() when it isn't empty.
2. During a run, the same number could be generated twice in a row. This would result in no shape being highlighted
    * Added a do while loop before adding the class, so the number is checked against the number of the previous run first. 
3. When submitting the first highscore, the fade in effect doesn't work
    * Highlighting is dependent upon the input being an object. Changed setHighscores() function to always fill the object so it is passed through to highlightHighscore()
4. When playing on mobile, the hover effect for the shapes stays after the round, causing confusion.
    * Changed the effect to only be active on larger then mobile screens, as the issue is touch vs. mouse.
5. When playing on mobile, the playing sound can be delayed causing it to only start playing when the round has already begun. 
    * Preloaded the playing audio element in the html, and call it using js. This ensures the data is present when needed instead of lazy loading. 
6. When playing on mobile, the tutorial text is not entirely visible..
    * This is due to the position: absolute. Fixed by setting the max width to 95vw. 
7. During play, the 'level' counter in the game information is never updated
    * This is caused by a mismatch in element naming. The name of the element called from javascript was different then the actual name. Corrected.
---