
## &rarr; **Testing**
### Code validators
* Tested for valid code using [w3 validator](https://validator.w3.org/nu/#textarea)
* Tested for accessibility using [achecker](https://achecker.ca/checker/index.php)

### User story tests


### Test script



## &rarr; **Bugs**
1. During a first run of the game, removeClass() would throw an error
    - shapeID is always empty during the first run in the interval (). Added an if statement to only removeClass() when it isn't empty.
2. During a run, the same number could be generated twice in a row. This would result in no shape being highlighted
    - Added a do while loop before adding the class, so the number is checked against the number of the previous run first. 
3. When submitting the first highscore, the fade in effect doesn't work
    - Highlighting is dependent upon the input being an object. Changed setHighscores() function to always fill the object so it is passed through to highlightHighscore()
4. When playing on mobile, the hover effect for the shapes stays after the round, causing confusion.
    - Changed the effect to only be active on larger then mobile screens, as the issue is touch vs. mouse.
5. When playing on mobile, the playing sound can be delayed causing it to only start playing when the round has already begun. 
    - Preloaded the playing audio element in the html, and call it using js. This ensures the data is present when needed instead of lazy loading. 
6. When playing on mobile, the tutorial text is not entirely visible..
    - This is due to the position: absolute. Fixed by setting the max width to 95vw. 
---