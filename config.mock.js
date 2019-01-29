const MOCK_CONFIG = require('./src/mock/index')

const proxy = {
  'GET /api/test': {
    'code': 200,
    'result': 'success',
  }
}

module.exports = Object.assign(proxy, MOCK_CONFIG)
