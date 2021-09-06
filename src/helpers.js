const codes = require('./error-codes');
const config = require('./config');
const route = `/api/v${config.version}`

function makeid(length, type) {
    var result = '';
    var characters;
    if (type == "normal" || type == "default") characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (type == "number" || type == "numonly") characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

class Error {
    constructor() {
        return codes.getCodesArray();
    }
}

class ErrorResponse {
    constructor(code, reason) {
        return {
            "success": false,
            "errors": [
                {
                    "code": code,
                    "reason": reason
                }
            ]
        }
    }
}

class Response {
    constructor(data) {
        return {
            "success": true,
            "data": data
        }
    }
}

class Endpoints {
    constructor(app) {
        this.app = app;
    }

    add(endpoints) {
        endpoints.forEach(endpoint => {
            this.app.use(`${route}/${endpoint.path}`, require('./endpoints/' + endpoint.file + '.js'));
        })
    }
}

function get_headers(request) {
    if (
        !request.headers['content-type'] || 
        !request.headers['user-agent'] || 
        !request.headers['timestamp']
    ) throw 'Some required request headers not found.';

    return headers = {
        'Content-Type': request.headers['content-type'],
        'User-Agent': request.headers['user-agent'],
        'Timestamp': request.headers['timestamp']
    } 
}

module.exports = { makeid, Endpoints, Response, Error, ErrorResponse, get_headers }