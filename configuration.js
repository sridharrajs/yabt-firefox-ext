var prefs = require('sdk/simple-prefs').prefs;
var passwords = require("sdk/passwords");

var _ = require("sdk/l10n").get;
const { resolve } = require('sdk/core/promise');
const { reject } = require('sdk/core/promise');
var notifications = require("sdk/notifications");
var preferencesUtils = require("sdk/preferences/utils");
var self = require("sdk/self");
var urls = require('sdk/url');

var tokensSeparator = ',';

function get_credentials() {
    return new Promise(function(resolve,reject){
	var	token = 'asdfasdas';
	resolve({
	    token:token
	});
    });
}

function set(token) {
    passwords.store({
	token:token,
	realm: 'API Tokens'
    });
}

exports.set = set;
exports.get_credentials = get_credentials;
