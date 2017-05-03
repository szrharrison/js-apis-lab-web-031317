var baseUrl = 'https://api.github.com/'
//define functions here
function createGist(file_name, content, description, token){
  var headerToken = 'token ' + token
  var url = baseUrl + 'gists'
  var file = {}
  file[file_name] = { content: content }
  var data = JSON.stringify({
    files: file,
    description: description,
    public: true
  })
  return $.ajax({
    type: 'POST',
    url: url,
    crossDomain: true,
    headers: {
      Authorization: headerToken
    },
    data: data,
    success: function(data) {
      return myGists(data.owner.login, token)
    }
  })
};

function myGists(username, token){
  var headerToken = 'token ' + token
  var url = baseUrl + 'users/' + username + '/gists'
  return $.ajax({
    type: 'GET',
    url: url,
    headers: {
      Authorization: headerToken
    },
    success: function(data) {
      return data
    }
  })
};

function bindCreateButton() {
  // call functions here
  $('#create-a-gist').on('submit', function(event) {
    event.preventDefault()
    var token = $('#personalToken').val()
    var file_name = $('#file_name').val()
    var description = $('#description').val()
    var content = $('#content').val()

    var gistPromise = createGist(file_name, content, description, token)

    gistPromise.then(function(gists) {
      for( var i = 0; i < gists.length; i++) {
        $('#display-gists').append('<div class="gist"><h4><a href="' + gists[i].html_url + '" target="_blank">' + gists[i].description + '</a></h4></div>')
      }
    })
  })
};

function bindShowButton() {
  $('#show-gists').on('submit', function(event) {
    event.preventDefault()
    var token = $('#personalToken2').val()
    var username = $('#username').val()

    var myGistPromise = myGists(username, token)

    myGistPromise.then(function(gists) {
      for( var i = 0; i < gists.length; i++) {
        $('#display-gists').append('<div class="gist"><h4><a href="' + gists[i].html_url + '" target="_blank">' + gists[i].description + '</a></h4></div>')
      }
    })
  })
}

$(document).ready(function(){
  bindCreateButton()
  bindShowButton()
});
