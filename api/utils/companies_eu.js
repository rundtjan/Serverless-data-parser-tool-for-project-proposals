/**
 * This file builds a set from the JSON containing european companies.
 */

const companiesJson = require('./euro_comp.json')

const companies_eu_Set = new Set(companiesJson)

module.exports = { companies_eu_Set }