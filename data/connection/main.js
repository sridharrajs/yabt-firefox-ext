var form = document.getElementById('connectionForm');
connectionForm.addEventListener('submit', function (event) {
  var token = document.getElementById('token').value;
  self.port.emit('connection', {
    token: token
  });
}, false);

self.port.on('error', function (text) {
  var alert = document.createElement('div');
  alert.setAttribute('id', 'alertBox');
  alert.setAttribute('class', 'alert alert-danger');
  alert.appendChild(document.createTextNode(text));
  form.insertBefore(alert, form.childNodes[0]);
});
