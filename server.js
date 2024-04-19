const express = require('express');
const app = express();
const port = 3000;

// Array of collectibles
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//Route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Route for greeting users
app.get('/greetings/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Hello there, ${username}!`);
});

// Route for rolling a dice
app.get('/roll/:number', (req, res) => {
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
app.get('/collectibles/:index', (req, res) => {
    const { index } = req.params;
    const idx = parseInt(index);

    if (isNaN(idx) || idx < 0 || idx >= collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        const item = collectibles[idx];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});

// Route for filtering shoes based on query parameters
//use example http://localhost:3000/shoes?type=sneaker

app.get('/shoes', (req, res) => {
    const { minPrice, maxPrice, type } = req.query;

    let filteredShoes = shoes.filter(shoe => {
        return (minPrice ? shoe.price >= Number(minPrice) : true) &&
               (maxPrice ? shoe.price <= Number(maxPrice) : true) &&
               (type ? shoe.type === type : true);
    });

    if (filteredShoes.length) {
        res.json(filteredShoes);
    } else {
        res.send("No shoes match your criteria.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
