var express = require('express')
var app = express()
var PeopleService = require('./PeopleService')

app.get('/:page/:nbrItems?', function (req, res) {
  let page = parseInt(req.params.page)
  let nbrItems = req.params.nbrItems ? parseInt(req.params.nbrItems) : 10

  if (isNaN(page)) {
    res.status(400).send('Invalid page requested: ' + req.params.page)
  } else if (isNaN(nbrItems) || nbrItems <= 0) {
    res.status(400).send('Invalid number of items per page requested: ' + req.params.nbrItems)
  } else if (nbrItems > 10) {
    // leaving 'to' instead of 'too' in the interest of faithful recreation
    res.status(400).send('To many items requested per page: ' + req.params.nbrItems)
  } else if (page % 3 === 0 || page % 5 === 0 || page <= 0) {
    res.status(400).send('Invalid page number requested: ' + req.params.page)
  } else {
    let response = PeopleService.getPagedPeople(page, nbrItems)
    res.status(200).send(response)
  }
})

module.exports = app
