/**
 * A function which parses the request/event from a lambda. It checks for the requestbody
 * either being a stringified JSON or the raw payload sent by a slashcommand in Slack. 
 * @param {*} req the request-object that the lamdba received 
 * @returns the request-object with a parsed req.body
 */

module.exports = (req) => {
  const body = {}
  const bodyArr = req.body.split('&')
  if (bodyArr.length == 1 && bodyArr[0].includes('{')){
    console.log('found a json')
    req.body = JSON.parse(req.body)
    return req
  }
  bodyArr.forEach(element => {
    body[element.split('=')[0]] = element.split('=')[1]
    if (body[element.split('=')[0]] === 'null') body[element.split('=')[0]] = null 
  })
  req.body = body
  return req
}