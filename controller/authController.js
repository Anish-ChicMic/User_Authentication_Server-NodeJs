const model = require('../model/model');
const dbScheme = require('../DBSchema/schema');
const { savePlayerCred } = require('../model/model.js')


function savePlayerCredentials(data) {
    console.log("In Controller ::::::::::::::: ", data);
    let credData = new dbScheme({
        name: data.name,
        email: data.email,
        userID: data.userID,
        password: data.password,
        accessToken: data.token
    });

    model.savePlayerCred(credData);
}

module.exports = { savePlayerCredentials };