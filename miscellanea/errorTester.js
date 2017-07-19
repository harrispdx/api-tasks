var request = require('request')
var baseUrl = require('./config').baseUrl
var errorPages = []
var remainingA = 100
var successPages = []
var remainingB = 100

// If you look at pages 1-10, you see that 3, 5, 6, 9, 10 error out.  Looks like multiples of 3 and 5.

// Are there any pages not divisible by 3 or 5 that produce errors?
for (var index = 0; index < 100; index++) {
  let page = index + 1
  var url = baseUrl + page + '/1'
  request(url, function (error, response, body) {
    if (response && response.statusCode != 200 && page % 3 != 0 && page % 5 != 0) {
      errorPages.push(page)
    }
    remainingA--
    if (remainingA === 0) {
      errorPages.sort(function (a, b) {
        return a - b
      })
      console.log('This should be empty: ', errorPages)
    }
  })
}

// Are there any pages that are divisible by 3 or 5 that do not produce errors?
for (var index = 0; index < 100; index++) {
  let page = index + 1
  var url = baseUrl + page + '/1'
  request(url, function (error, response, body) {
    if (response && response.statusCode === 200 && (page % 3 === 0 || page % 5 === 0)) {
      successPages.push(page)
    }
    remainingB--
    if (remainingB === 0) {
      successPages.sort(function (a, b) {
        return a - b
      })
      console.log('This should be empty: ', successPages)
    }
  })
}
