const app = require('../app/app')
const request = require('supertest')
const tap = require('tap')

tap.test('Should retrieve 8 items successfully', function (t) {

  t.plan(3)

  request(app)
    .get('/4/8')
    .expect(200)
    .end(function(err, res) {
      t.error(err)
      t.equals(res.statusCode, 200)
      t.equals(res.body.length, 8)
      t.end()
    })
})

tap.test('Should retrieve 10 items successfully (nbrItems not provided)', function (t) {

  t.plan(3)

  request(app)
    .get('/4')
    .expect(200)
    .end(function(err, res) {
      t.error(err)
      t.equals(res.statusCode, 200)
      t.equals(res.body.length, 10)
      t.end()
    })
})

tap.test('Should return status 200 but no data', function (t) {

  t.plan(3)

  request(app)
    .get('/13/10')
    .expect(200)
    .end(function(err, res) {
      t.error(err)
      t.equals(res.statusCode, 200)
      t.equals(res.body.length, 0)
      t.end()
    })
})


tap.test('Should return status 400 because page 3 is not valid', function (t) {

  t.plan(3)

  request(app)
    .get('/3/10')
    .expect(400)
    .end(function(err, res) {
      t.error(err)
      t.equals(res.statusCode, 400)
      t.ok(res.body)
      t.end()
    })
})

tap.test('Should return status 400 because page cats is not valid', function (t) {

  t.plan(3)

  request(app)
    .get('/cats/10')
    .expect(400)
    .end(function(err, res) {
      t.error(err)
      t.equals(res.statusCode, 400)
      t.ok(res.body)
      t.end()
    })
})

tap.test('Should return status 400 because cats is not a number of items', function (t) {

  t.plan(3)

  request(app)
    .get('/4/cats')
    .expect(400)
    .end(function(err, res) {
      t.error(err)
      t.equals(res.statusCode, 400)
      t.ok(res.body)
      t.end()
    })
})

tap.test('Should return status 400 because page -1 is not valid', function (t) {

  t.plan(3)

  request(app)
    .get('/-1/10')
    .expect(400)
    .end(function(err, res) {
      t.error(err)
      t.equals(res.statusCode, 400)
      t.ok(res.body)
      t.end()
    })
})

tap.test('Should return status 400 because 13 is too many items', function (t) {

  t.plan(3)

  request(app)
    .get('/4/13')
    .expect(400)
    .end(function(err, res) {
      t.error(err)
      t.equals(res.statusCode, 400)
      t.ok(res.body)
      t.end()
    })
})

