var tabs = require('sdk/tabs');
var simplePrefs = require('sdk/simple-prefs');
var prefs = simplePrefs.prefs;

var store = require("./store");
var server = require("server");
var connection = require("connection");
var save = require("save");
var contextMenu = require("sdk/context-menu");
var _ = require("sdk/l10n").get;

var configurations = {
    url: 'http://localhost:7000',
    token: store.getToken()
};

contextMenu.Item({
    label: _('url_context_menu_saving'),
    context: contextMenu.SelectorContext("a[href]"),
    contentScript: 'self.on("click", function (node) {' +
    '  self.postMessage(node.href);' +
    '});',
    onMessage: handleChange
});

function handleChange(customUrl) {
    var dialog = connection.create_panel();
    var url = typeof(customUrl) === 'string' ? customUrl : tabs.activeTab.url;
    server.post(configurations, url).then(function (data) {
        console.log('Saved!', data);
    }).catch(function (error) {
        console.log('Failed!', error);
    });
}


