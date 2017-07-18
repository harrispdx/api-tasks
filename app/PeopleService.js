var PeopleService = {}
var people = require('../data/people')

PeopleService.getPagedPeople = function (page, nbrItems) {
  let start = (page - 1) * nbrItems + 1
  let end = page * nbrItems
  var response = []
  for (var i = start; i <= end; i++) {
    response.push(people[i])
  }
  return response
}

module.exports = PeopleService
