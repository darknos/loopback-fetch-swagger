var client = require('swagger-client');
var traverse = require('traverse');

module.exports = {
    fetch: function(options, cb) {
        var swagger = new client({
            url: options.url,
            failure: function(err) {
                cb("Can't fetch swagger resource. Error: " + err);
            },
            success: function() {
                var obj = JSON.parse(JSON.stringify(swagger.swaggerObject));
                traverse(obj).forEach(function(x) {
                    if (["signature", "sampleJSON", "responseClassSignature"].indexOf(this.key) > -1) {
                        this.remove();
                    }
                    if (options.cleanup) {
                        if (["summary", "description"].indexOf(this.key) > -1) {
                            this.remove();
                        }
                    }
                });
                var result = JSON.stringify(obj, null, options.pretty ? "\t" : undefined);
                cb(null, result);
            }
        });
    }
};
