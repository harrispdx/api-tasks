var request = require('request')
var urlBase = require('./config').urlBase
var people = {}
var remaining = 0

var parseResponse = function (error, response, body) {
  remaining--
  body = JSON.parse(body)
  for (var index = 0; index < body.length; index++) {
    var person = body[index];
    people[person.Number - 1] = person
  }
  if (remaining === 0 ) {
    console.log(people)
  }
}

for (var i = 1; i < 11; i++) {
  for (var j = 1; j <= (Math.ceil(100 / i)); j++) {
    if (j % 3 != 0 && j % 5 != 0) {
      url = urlBase + j + '/' + i
      remaining++
      request(url, parseResponse);
    }
  }
}