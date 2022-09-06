const { MongoClient } = require('mongodb');
const _ = require('underscore');
const log4js = require("log4js");
const fs = require('fs');

log4js.configure({
  appenders: {
    "stdout" : { type: "stdout" },
    "file"   : { type: "file", filename: "logs/out.log" }
  },
  categories: {
    default:  { appenders: [ 'stdout', 'file' ], level: 'info' }
  }
});
const logger = log4js.getLogger();

// Connection URL via MongoDB
const url =   ''
const client = new MongoClient(url);

// Database Name
const dbName = '';

exports.handler = async function(event, context, callback) {
  // Use connect method to connect to the server
  // find by email - line 35 add email
    let findResults;
    try {
        await client.connect();
        logger.info('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('sb_donation');
        findResults = await collection
            .find({
                'email': '',
                'parent_id': { '$ne': '' },
                'do_not_import_enterprise': { '$ne': 1 },
                'form_internal_name': { '$not': { '$regex': new RegExp('sustchange'), '$options': 'i' }},
                'form_internal_name': { '$not': { '$regex': new RegExp('sustainer migration form'), '$options': 'i' }},
            })
            .sort({ 'created_at.date': -1})
            .toArray();
        logger.info('🟢: Found documents =>', findResults[1]);
    } finally {
        const response = {
            statusCode: 200,
            body: JSON.stringify(findResults[1])
        }
        callback(null, response)
        await client.close()
    }

}
