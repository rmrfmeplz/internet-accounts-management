const R = require('../common/responses/R')

module.exports = (req, resp, next) => {
    resp.success = (data) => resp.json(R.success(data))
    resp.fail = (message) => resp.json(R.fail(message))
    resp.new = (code, message, data) => resp.json(R.new(code, message, data))
    next()
}