const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { savePlayerCredentials } = require('./controller/authController.js');
const { getUsersByUserIdPwd } = require('./model/model.js');
const { use } = require('bcrypt/promises.js');

dotenv.config();
const app = express();
app.use(express.json())

// const users = [];

connect();

async function connect() {
    try {
        await mongoose.connect(process.env.DEMO_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected To Database!");
        app.listen(3000);
        return true;
    }
    catch (err) {
        console.error(`Some Error Occurs While Connecting DB => ${err}`);
        return false;
    }
}


app.get('/users', (req, res) => {
    res.json(users);
});


app.post('/users/signUp', async (req, res) => {
    try {
        let userData = {
            name: req.body.name,
            email: req.body.email,
            userID: req.body.userID,
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const jwtToken = jwt.sign(userData, process.env.JWT_SECRET_KEY);

        userData.password = hashedPassword;
        userData.token = jwtToken;

        console.log("this is: ", userData);
        savePlayerCredentials(userData);
        res.status(201).send(userData.token);
    }
    catch {
        res.status(500).send();
    }
});



app.post('/users/login', async (req, res) => {
    console.log(req.body.userID, req.body.password);

    const id = req.body.userID;
    const pwd = req.body.password;
    const users = await getUsersByUserIdPwd(id);

    const user = users.find(user => user.userID = id);
    console.log("sp: ", user);

    if (user == null) {
        return res.status(400).send('User Not Found! Error ❌');
    }

    try {
        if (await bcrypt.compare(pwd, user.password)) {
            console.log("Login Successful! ✅")
            res.send(user.accessToken)
        }
        else { res.send(`Credentials Didn't Matched! ❌`); }
    }
    catch {
        res.send(500).send();
    }

})


// app.listen(3000);