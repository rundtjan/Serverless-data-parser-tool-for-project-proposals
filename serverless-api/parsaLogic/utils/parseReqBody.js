module.exports = (req) => {
    const body = {}
    const bodyArr = req.body.split('&')
    bodyArr.forEach(element => {
        body[element.split('=')[0]] = element.split('=')[1]
        if (body[element.split('=')[0]] === 'null') body[element.split('=')[0]] = null 
    });
    req.body = body
    return req
}