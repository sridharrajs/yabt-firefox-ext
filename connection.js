var panels = require('sdk/panel');
var _ = require('sdk/l10n').get;

function create_panel() {
  var connection_panel = panels.Panel({
    contentURL: './connection/index.html',
    contentScriptFile: './connection/main.js'
  });

  connection_panel.port.on('connection', function (token) {
    console.log('token received is', token);
  });

  return connection_panel;
}

exports.create_panel = create_panel;
