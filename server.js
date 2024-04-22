//server.js is the main file that will run the server and handle requests.
//It will listen for requests on port 3000 and respond to requests for the home page, greeting users, rolling a dice, accessing collectibles by index, and filtering shoes based on query parameters.

// Import the express module and create an instance of the express application
const express = require("express");
const app = express();

// Set the port number for the server to listen on
const port = 3000;

// Array of collectibles
const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

// Array of shoes
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

//Route for the home page
//Use example http://localhost:3000/ - displays the message "Welcome to the homepage!"
app.get("/", (req, res) => {
    res.send("Welcome to the homepage!");
});

// Route for greeting users
//Use example http://localhost:3000/greetings/Scott - greets the user with the name Scott
app.get("/greetings/:username", (req, res) => {
    const { username } = req.params;
    res.send(`Hello there, ${username}!`);
});

// Route for rolling a dice
// Use example http://localhost:3000/roll/20 - generates a random number between 1 and 20
app.get("/roll/:number", (req, res) => {
    const { number } = req.params;

    if (isNaN(number)) {
        res.send("You must specify a number.");
    } else {
        const max = parseInt(number);
        const roll = Math.floor(Math.random() * (max + 1));
        res.send(`You rolled a ${roll}.`);
    }
});

// Route for accessing collectibles by index
// Use example http://localhost:3000/collectibles/1
app.get("/collectibles/:index", (req, res) => {
    const { index } = req.params;
    const idx = parseInt(index);

    if (isNaN(idx) || idx < 0 || idx >= collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        const item = collectibles[idx];
        res.send(
            `So, you want the ${item.name}? For ${item.price}, it can be yours!`
        );
    }
});

// Route for filtering shoes based on query parameters
// Use example http://localhost:3000/shoes?type=sneaker

 NN;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
