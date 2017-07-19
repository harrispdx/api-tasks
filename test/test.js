const app = require('../app/app')
const tap = require('tap')
const request = require('request')
// const baseUrl = require('../config').baseUrl

var server = app.listen(3000);
const baseUrl = 'http://localhost:3000/'


tap.test('Should retrieve 8 items successfully', function (t) {

  t.plan(3)

  url = baseUrl + '4/8'
  request(url, function(err, response, body) {
      t.error(err)
      t.equals(response.statusCode, 200)
      t.equals(JSON.parse(response.body).length, 8)
      t.end()
    })
})

tap.test('Should retrieve 10 items successfully (nbrItems not provided)', function (t) {

  t.plan(3)

  url = baseUrl + '4'
  request(url, function(err, response, body) {
      t.error(err)
      t.equals(response.statusCode, 200)
      t.equals(JSON.parse(response.body).length, 10)
      t.end()
    })
})

tap.test('Should return status 200 but no data', function (t) {

  t.plan(3)

  url = baseUrl + '13/10'
  request(url, function(err, response, body) {
      t.error(err)
      t.equals(response.statusCode, 200)
      t.equals(JSON.parse(response.body).length, 0)
      t.end()
    })
})

tap.test('Should return status 400 because page 3 is not valid', function (t) {

  t.plan(3)

  url = baseUrl + '3/10'
  request(url, function(err, response, body) {
    t.error(err)
    t.equals(response.statusCode, 400)
    t.equals(response.body, 'Invalid page number requested: 3')
    t.end()
  })
})

tap.test('Should return status 400 because page cats is not valid', function (t) {

  t.plan(3)

  url = baseUrl + 'cats/10'
  request(url, function(err, response, body) {
    t.error(err)
    t.equals(response.statusCode, 400)
    t.equals(response.body, 'Invalid page requested: cats')
    t.end()
  })
})

tap.test('Should return status 400 because cats is not a number of items', function (t) {

  t.plan(3)

  url = baseUrl + '4/cats'
  request(url, function(err, response, body) {
    t.error(err)
    t.equals(response.statusCode, 400)
    t.equals(response.body, 'Invalid number of items per page requested: cats')
    t.end()
  })
})

tap.test('Should return status 400 because page -1 is not valid', function (t) {

  t.plan(3)

  url = baseUrl + '-1/10'
  request(url, function(err, response, body) {
    t.error(err)
    t.equals(response.statusCode, 400)
    t.equals(response.body, 'Invalid page number requested: -1')
    t.end()
  })
})

tap.test('Should return status 400 because 13 is too many items', function (t) {

  t.plan(3)

  url = baseUrl + '4/13'
  request(url, function(err, response, body) {
    t.error(err)
    t.equals(response.statusCode, 400)
    t.equals(response.body, 'To many items requested per page: 13')
    t.end()
    server.close()
  })
})