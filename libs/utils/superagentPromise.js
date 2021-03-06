"use strict";

var Promise = require("bluebird");

var Request = require("superagent").Request;
/**
 *  From https://github.com/opinsys/puavo-ticket/blob/master/utils/superagentPromise.js
 *
 */

/**
 *
 * Add promise support for superagent/supertest
 *
 * Call .promise() to return promise for the request
 *
 * @method promise
 * @return {Bluebird.Promise}
 */
Request.prototype.promise = function() {
    var self = this;
    return new Promise(function(resolve, reject){
        Request.prototype.end.call(self, function(err, res) {
            if (err) return reject(err);
            if (res.status === 500) {
                return reject(new Error(res.text));
            }
            resolve(res);
        });
    });
};