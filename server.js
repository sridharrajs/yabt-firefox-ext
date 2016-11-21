const { defer } = require('sdk/core/promise');
var Request = require("sdk/request").Request;

function post(server, url) {
  var deferred = defer();

  Request({
    url: server.url + "/api/articles",
    content: {
      url: url
    },
    headers: {
      'Authorization': "Bearer " + server.access_token
    },
    onComplete: function(response) {
      if (response.status == 200) {
        deferred.resolve(response.json);
      } else {
        deferred.reject(response.json);
      }
    }
  }).post();

  return deferred.promise;
}

exports.post = post;
