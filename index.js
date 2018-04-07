'use strict'
const cityMapping = require('./data/cityMap.json')

function lookupViaCity(city, fuzzy = false) {
  const cities = cityMapping.filter((item) => {
    if (!fuzzy) return item.city.toLowerCase() === city.toLowerCase()
    return item.city.toLowerCase().includes(city.toLowerCase())
  })

  return cities
}

function lookupViaState(state, fuzzy = false) {
  const states = cityMapping.filter((item) => {
    if (!fuzzy) return item.province.toLowerCase() === state.toLowerCase()
    return item.province.toLowerCase().includes(state.toLowerCase())
  })

  return states
}

function lookupViaCityState(city, state, fuzzy = false) {
  const cities = cityMapping.filter((item) => {
    let cityMatched = false
    let stateMatched = false
    if (!fuzzy) {
      cityMatched = item.city.toLowerCase() === city.toLowerCase()
      stateMatched = item.province.toLowerCase() === state.toLowerCase()

      return cityMatched && stateMatched
    }

    cityMatched = item.city.toLowerCase().includes(city.toLowerCase())
    stateMatched = item.province.toLowerCase().includes(state.toLowerCase())

    return cityMatched && stateMatched
  })

  return cities
}

module.exports = {
  lookupViaCity
, lookupViaCityState
, lookupViaState
}
