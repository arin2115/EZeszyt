var express = require('express');
var router = express.Router();
var User = require('../../db/manager').User;
var utils = require('../../helpers');
var bcrypt = require('bcrypt');
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

    var logged = false;
    if (logged) {
        var userinfo = await User.findAll({
            where: {
                username: req.session.username
            }
        });
        if (!userinfo) return res.status(400).json(new ErrorResponse(Error.InvalidPassword, "Password is invalid."));
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

    if (!req.body.username || !req.body.email || !req.body.password || !req.body.repeatpassword || !req.body["g-recaptcha"]) return res.status(400).json({"success": false, "errors": [{"message": "Bad Request"}]});
    if (req.body.password != req.body.repeatpassword) return res.status(400).json(new ErrorResponse(Error.InvalidRepeatPassword, "RepeatPassword is invalid."));
    if (!utils.verifyCaptcha(req.body["g-recaptcha"])) return res.status(400).json(new ErrorResponse(Error.InvalidCaptcha, "Invalid Captcha."));
    var userinfo = await User.findAll({
        where: {
            username: req.body.username
        }
    });
    userinfo = JSON.parse(JSON.stringify(userinfo, null, 2))[0];
    if (!userinfo) {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            User.create({
                "username": req.body.username,
                "email": req.body.email,
                "password": hash,
                "createdAt": Math.floor(Date.now() / 1000)
            })
    
            req.session.logged = true;
            req.session.username = req.body.username;
            req.session.password = req.body.password;
            return res.status(200).json(new Response({}));
        })
    } else {
        return res.status(400).json(new ErrorResponse(Error.UsernameUsed, "Username is already used."));
    };

});

module.exports = router;