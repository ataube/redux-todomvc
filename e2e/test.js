/* eslint-env mocha */
import expect from 'unexpected'
import selenium from 'selenium-webdriver'
import test from 'selenium-webdriver/testing'
import TestUtils from 'react-addons-test-utils'

test.describe('React locator', function() {
  let driver

  test.before(function() {
    driver = new selenium.Builder()
    .forBrowser('firefox')
    .build()
  })

  test.it('checks the application title', function() {
    driver.get('http://localhost:3000/')

    return expect(
      driver.getTitle(), 'when fulfilled', 'to equal', 'Redux TodoMVC example'
    )
  })
})
