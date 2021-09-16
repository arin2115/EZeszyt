var express = require('express');
var router = express.Router();
var helpers = require('../helpers');
var User = require('../db/manager').User;
var utils = require('../../helpers');
var Response = utils.Response;
var Error = new utils.Error();
var ErrorResponse = utils.ErrorResponse;

router.post('/', async function(req, res, next) {

    var headers;

    try {
        headers = utils.get_headers(req);
    } catch {
        return res.status(400).json(new ErrorResponse(Error.InvalidHeaders, "Some required request headers not found."));
    }

    var logged = await helpers.isLogged(req.session);
    if (logged) {
        var userinfo = await User.findAll({
            where: {
                username: req.session.username
            }
        });
        userinfo = JSON.parse(JSON.stringify(userinfo, null, 2))[0];
        var isAdmin = userinfo.admin;
        var isBanned = userinfo.ban;
        var banRedirect;
        if (isAdmin && isBanned) banRedirect = false;
        if (isBanned && !isAdmin) banRedirect = true;
        if (!isBanned) banRedirect = false;
        if (banRedirect) return res.status(400).json(new ErrorResponse(Error.BannedUser, "The requested user is banned."));
        return res.status(200).json(new Response({ session: req.session }));
    }

    if (!req.body.username || !req.body.password) return res.status(400).json({"success": false, "errors": [{"message": "Bad Request"}]});
    var userinfo = await User.findAll({
        where: {
            username: req.body.username
        }
    });
    userinfo = JSON.parse(JSON.stringify(userinfo, null, 2))[0];
    var pass_db = userinfo.password;
    if (!pass_db) return res.status(400).json(new ErrorResponse(Error.InvalidPassword, "Password is invalid."));
    var pass_validate = await helpers.compare(req.body.password, pass_db);
    if (pass_validate) {
        req.session.logged = true;
        req.session.username = req.body.username;
        req.session.password = req.body.password;
        return res.status(200).json(new Response({ session: req.session }));
    } else {
        return res.status(400).json(new ErrorResponse(Error.InvalidPassword, "Password is invalid."));
    }

});

module.exports = router;