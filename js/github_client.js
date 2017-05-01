//define functions here
var createGist = function(file_name, content, description, token){
  var headerToken = 'token ' + token
  var url = 'https://api.github.com/gists'
  var file = {}
  file[file_name] = { content: content }
  $.ajax({
    type: 'POST',
    url: url,
    headers: {
      Authorization: headerToken,
      files: file,
      description: description,
      public: true
    },
    success: function(data) {
      return data
    }
  })
};

var myGists = function (username, token){
  var headerToken = 'token ' + token
  var url = 'https://api.github.com/users/' + username + '/gists'
  $.ajax({
    type: 'GET',
    url: url,
    headers: {Authorization: headerToken},
    success: function(data) {
      return data
    }
  })
};

var bindCreateButton = function() {
  // call functions here

};

$(document).ready(function(){
});
