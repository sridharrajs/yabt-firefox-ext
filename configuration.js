var prefs = require('sdk/simple-prefs').prefs;
var passwords = require("sdk/passwords");

var _ = require("sdk/l10n").get;
const { resolve } = require('sdk/core/promise');
const { reject } = require('sdk/core/promise');
var notifications = require("sdk/notifications");
var preferencesUtils = require("sdk/preferences/utils");
var self = require("sdk/self");
var urls = require('sdk/url');

function get_credentials() {
  return new Promise(function(resolve, reject) {
    passwords.search({
      username: prefs.wallabagUrl,
      onComplete: function onComplete(credentials) {
        if(credentials.length > 1) {
          reject();
        } else {
          if(credentials.length === 1) {
            resolve(credentials[0]);
          } else {
            resolve(credentials);
          }
        }
      }
    });
  });
}

function reset_credentials() {
  passwords.search({
    username: prefs.wallabagUrl,
    onComplete: function onComplete(credentials) {
      credentials.forEach(passwords.remove);
    }
  });
}

/**
 * Check if the configuration is ok for connection
 */
function has_access(credentials) {
  console.log(prefs.wallabagUrl, prefs.wallabagClientId, prefs.wallabagSecretId, credentials.password, credentials.realm, urls.isValidURI(prefs.wallabagUrl));
  return prefs.wallabagUrl && prefs.wallabagClientId && prefs.wallabagSecretId && credentials.password && credentials.realm && urls.isValidURI(prefs.wallabagUrl);
}

/**
 * Check if configuration is ok for creating access token
 */
function verify_config() {
  if (prefs.wallabagUrl === "" || prefs.wallabagClientId === "" || prefs.wallabagSecretId === "") {
    var errorMessage = _("cfg_required_msg");
  } else if (!urls.isValidURI(prefs.wallabagUrl)) {
    var errorMessage = _("cfg_valid_url_msg");
  }

  if (errorMessage) {
    notifications.notify({
      title: _("cfg_config_error_title"),
      text: errorMessage,
      iconURL: "./icon-64.png"
    });

    preferencesUtils.open(self);
    return reject();
  } else {
    return resolve({
      url: prefs.wallabagUrl.replace(/\/$/, ""),
      client_id: prefs.wallabagClientId,
      client_secret: prefs.wallabagSecretId
    });
  }
}

function set(wallabag_url, wallabag_access_token, wallabag_refresh_token) {
  passwords.store({
    username: wallabag_url,
    password: wallabag_access_token,
    realm: wallabag_refresh_token
  });
}

exports.has_access = has_access;
exports.verify_config = verify_config;
exports.set = set;
exports.get_credentials = get_credentials;
exports.reset_credentials = reset_credentials;
