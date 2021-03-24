'use strict';

/*
* External Dependancies
*/
const rq = require('request-promise');

/*
Author: Daniel Winter-Wijntjes
Website: https://github.com/danwinterwijntjes/
Name: SMS Global Send SMS Class
*/
class SMSGlobal {
    constructor() {
        this.auth = {};
        this.message = {};
    }
    authenticate(user, password) {
        this.auth = {
            user,
            password,
        };
    }
    setFromName(value) {
        this.message.fromName = value;
    }
    setRecipient(value) {
        this.message.recipient = value;
    }
    setMessageBody(value) {
        this.message.body = value;
    }
    send() {
        if (!this.message.body) throw new Error('No message body');
        if (!this.message.recipient) throw new Error('No message recipient');
        if (!this.auth.user || !this.auth.password) throw new Error('No authentication parameters');
        return rq({
            uri: 'https://api.smsglobal.com/http-api.php',
            qs: {
                action: 'sendsms',
                user: this.auth.user,
                password: this.auth.password,
                from: this.message.fromName,
                to: this.message.recipient,
                text: this.message.body,
            }
        }).then((res) => {
            return ({
                success: true,
                message: res
            });
        }).catch((err) => {
            return ({
                success: false,
                errors: ['Something went wrong with error - ', err],
            })
        });
    }
}

module.exports = SMSGlobal;
