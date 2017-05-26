This is a tictactoe game designed for two players using plain HTML and Javascript.

It waits for two players to load the same webpage and then starts the game.
If more people load the webpage after that, then they can watch but they
can't play the game at all.

Game design notes:
- The game is mostly client-side: HTML and plain Javascript do most of the work,
but there is a Firebase database component..

- It needs a firebase database to connect to but that's the only 
server-side part.

- Everything is (re)created on the client side and then clients update their
info on their game turn and then tell the database to update its info, causing all
other clients to update because everyone is listening to the database.

Weaknesses:
- there could be data races since code is executed asynchronously
(everyone is listening for database changes in addition to running their
sequential code)


Your tasks:
- change the game to use your own Firebase account and web application

- complete the disconnect() function in the Javascript file, or use a 'Cloud Function' and client authentication to handle this functionality with your Firebase database

- make the HTML display the messageBox properly to the right side of the board
(see "https://www.w3schools.com/html/html5_semantic_elements.asp")

- edit the CSS to display a more evenly lined-up board

Extra credit:
- make the webpage mobile friendly using Bootstrap HTML and CSS classes
    1. read "https://www.w3schools.com/bootstrap/default.asp"
    2. see "https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp")
    3. make sure to put any HTML elements with bootstrap classes in a 'container' element

- add sound effects (see the Galaxian Space Shooter example in Section 5)
