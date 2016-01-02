#! /usr/bin/env node

/*
 * loopback-fetch-swagger
 * https://github.com/adarknos/loopback-fetch-swagger
 *
 * Copyright (c) 2015 Sergey Nosenko
 * Licensed under the MIT license.
 */

'use strict';

var program = require('commander');

program
    .version('0.0.1')
    .usage('[options] -u <url> -o <file>')
    .option('-u, --url <url>', 'Loopback API base URL')
    .option('-o, --output [file]', 'Output filename')
    .option('-f, --force', 'Force override')
    .option('-c, --cleanup', 'Force cleanup')
    .option('-p, --pretty', 'Pretty print json')
    .parse(process.argv);

if (!program.url) {
    program.help();
}

var loopback_fetch_swagger = require('../lib/loopback-fetch-swagger.js');
var fs = require("fs");
loopback_fetch_swagger.fetch(program, function(err, result) {
    if (err) {
        console.error(err);
    } else {
        if (program.output) {
            if (fs.existsSync(program.output) && !program.force) {
                console.log("File exists. Use -f option to overwrite.");
            } else {
                fs.writeFileSync(program.output, result, 'utf8');
            }
        } else {
            console.log(result);
        }
    }
});
