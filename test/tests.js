'use strict'
const assert = require('assert')
const cityTimezones = require('../index.js')

describe('City lookup tests', function() {
    it('finding Chicago', function() {
      let city = cityTimezones.lookupViaCity('Chicago')
      assert.equal(41.82999066, city[0].lat)
    })
    it('return empty for non matching city', function() {
      let city = cityTimezones.lookupViaCity('Foobar')
      assert.deepEqual([], city)
    })
    it('return multiple matches', function() {
      let city = cityTimezones.lookupViaCity('Springfield')
      assert(city.length > 1, city)
    })
    it('return multiple Jackson when fuzzy true', function() {
      let city = cityTimezones.lookupViaCity('Jacks', true)
      assert(city.length === 4)
    })
})

describe('Province/State lookup tests', function() {
  it ('finding Hawaii cities', function() {
    let city = cityTimezones.lookupViaState('Hawaii')
    assert(city.length === 6)
  })
  it('return empty for non matching province/state', function() {
    let city = cityTimezones.lookupViaState('FizzBuzz')
    assert.deepEqual([], city)
  })
  it('return all Mississippi when fuzzy true', function() {
    let city = cityTimezones.lookupViaState('Missis', true)
    assert(city.length === 11)
  })
})

describe('City/State lookup tests', function() {
  it('finding Los Angeles, California', function() {
    let city = cityTimezones.lookupViaCityState('Los Angeles', 'California')
    assert.equal(33.98997825, city[0].lat)
    assert.equal('Los Angeles', city[0].city)
  })

  it('return empty for non matching city', function() {
    let city = cityTimezones.lookupViaCityState('Foobar', 'Virginia')
    assert.deepEqual([], city)
  })

  it('return empty for non matching state', function() {
    let city = cityTimezones.lookupViaCityState('New York', 'FizzBuzz')
    assert.deepEqual([], city)
  })

  it('find New York when fuzzy true', function() {
    let city = cityTimezones.lookupViaCityState('New Yo', 'New York', true)
    assert(city.length === 1)
  })

  it('find Denver when fuzzy', function() {
    let city = cityTimezones.lookupViaCityState('Denver', 'Col', true)
    assert(city.length === 1)
  })
})
