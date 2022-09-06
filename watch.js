#!/usr/bin/env node

const { exec } = require("child_process");
const log4js = require("log4js");
const fs = require('fs');

log4js.configure({
    appenders: {
        "stdout" : { type: "stdout" },
        "file"   : { type: "file", filename: "logs/watch.log" }
    },
    categories: {
        default:  { appenders: [ 'stdout', 'file' ], level: 'info' }
    }
});
const logger = log4js.getLogger();

require('esbuild').build({
    entryPoints: ['src/index.js'],
    outfile: 'dist/index.js',
    sourcemap: true,
    bundle: true,
    platform: 'node',
    watch: {
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error)
            else {
                console.log('About to restart docker instance');
                    exec("docker restart lambda", (error, stdout, stderr) => {
                        if (error) {
                            logger.error(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            logger.error(`stderr: ${stderr}`);
                            return;
                        }
                        logger.info(`stdout: ${stdout}`);
                    });
            }
        },
    },
}).then(result => {
    console.log('watching...')
})
