const mongoose = require("mongoose");
const dbScheme = require('../DBSchema/schema');
const dotenv = require('dotenv');

dotenv.config();

async function connect() {
    try {
        await mongoose.connect(process.env.DEMO_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected To Database!");
        return true;
    }
    catch (err) {
        console.error(`Some Error Occurs => ${err}`);
        return false;
    }
}

function savePlayerCred(data) {
    data.save()
        .then((result) => {
            console.log("Player Cred Data Saved: " + result);
            // return new Promise((resolve, reject) => {
            //     resolve(result);
            // });
        })
        .catch((err) => {
            console.log("Error Occured While Saving PlayerCred Data: => ", err);
            // return new Promise((resolve, reject) => {
            //     reject(err);
            // })
        });
}

async function getUsersByUserIdPwd(id) {

    try {
        let dbData = await dbScheme.find({ userID: id })
        //console.log(dbData) //Console logs succesfully
        return new Promise((resolve, reject) => {
            resolve(dbData);
        })
    }
    catch (err) {
        console.log(err)
        return new Promise((resolve, reject) => {
            reject(err);
        })
    }
}

module.exports = {
    connect,
    savePlayerCred,
    getUsersByUserIdPwd
}