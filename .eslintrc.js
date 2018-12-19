module.exports = {
  'env': {
    'jest': true
  },
  'extends': 'airbnb',
  'rules': {
    'no-param-reassign': 0
  },
  'settings': {
    'import/resolver': {
      'node': {
        'paths': ['src']
      }
    },
  }
}