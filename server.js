var Request = require('sdk/request').Request;

function post(server, url) {
  return new Promise(function (resolve, reject) {
    Request({
      url: server.url + '/api/articles',
      content: {
        url: url
      },
      headers: {
        'Authorization': "Bearer " + server.token
      },
      onComplete: function (response) {
        if (response.status == 200) {
          resolve(response.json);
        } else {
          reject(response.json);
        }
      }
    }).post();
  });
}

exports.post = post;
