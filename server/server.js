const express = require('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
});

app.use(express.json({limit: '10mb'}))

let db = new sqlite3.Database('recipeDatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the access database.");
})

app.post('/validatePassword', (req,res) => {
    const {username, password} = req.body 

     // Using parameterized query to prevent SQL injection
     db.all('SELECT * FROM UserCredentials WHERE username = ? AND password = ?', [username, password], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ validation: false, error: 'Internal server error' });
            return;
        }

        if (rows.length > 0) {
            res.send({ validation: true });
        } else {
            res.send({ validation: false });
        }
    });
})


app.post('/registerUser', (req, res) => {
    const { username, email, password, phoneNumber } = req.body;

    // Input validation
    if (!username || !email || !password || !phoneNumber) {
        return res.status(400).json({ validation: false, error: 'All fields are required' });
    }

    // Using parameterized query to prevent SQL injection
    db.run('INSERT INTO UserCredentials (username, email, password, phone_number) VALUES (?, ?, ?, ?)', [username, email, password, phoneNumber], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ validation: false, error: 'Internal server error' });
        }
        res.status(200).json({ validation: true });
    });
});

app.listen(3004, () => console.log("Listening at port 3004"));
