testsContext = require.context('.', true, /.spec.coffee$/)
testsContext.keys().forEach(testsContext)
