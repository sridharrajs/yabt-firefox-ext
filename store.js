var prefs = require('sdk/simple-prefs').prefs;
var passwords = require("sdk/passwords");

var token = 'demo';

function getToken() {
    return token;
}

function setToken(token) {
    passwords.store({
        token: token,
        realm: 'API Tokens'
    });
}

exports.setToken = setToken;
exports.getToken = getToken;
