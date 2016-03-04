/* eslint-env mocha */

import React from 'react'
import expect from 'unexpected'
import webdriver from 'selenium-webdriver'

import TodoItem from '../components/TodoItem'

function byComponent(el) {
  /* global __retractor */
  return webdriver.By.js(function(name, filter) {
    return __retractor.findOneDOMNode(name, filter)
  }, el.type.name, { props: el.props })
}

describe('React locator', function() {
  let driver

  before(function() {
    driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build()
  })

  it('checks the application title', function() {
    driver.get('http://localhost:3000/')

    const el = driver.findElement(byComponent(
      <TodoItem todo={{ text: 'Use Redux' }} />
    ))

    return expect(el, 'when fulfilled', 'to be a', webdriver.WebElement)
  })
})
