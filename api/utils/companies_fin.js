/**
 * This file builds a set from the json containing finnish companies.
 */

const companiesJson = require('./comp_fin_long_names.json')

const companies_Set = new Set(companiesJson)

module.exports = { companies_Set }