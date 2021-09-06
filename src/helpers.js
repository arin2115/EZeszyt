var User = require('./db/manager').User;
// const crypto = require('crypto');

async function isLogged(session) {
    // if (!session.logged) return false;
    // if (!session.logged || !session.username || !session.password) return false;
    // var username_res = session.username;
    // if (!username_res) return false;
    // var password_hash = await hash(session.password);
    // var userinfo = await User.findAll({
    //     where: {
    //         username: session.username
    //     }
    // });
    // userinfo = JSON.parse(JSON.stringify(userinfo, null, 2))[0];

    // var password_res = userinfo ? userinfo.password : null;
    // if (!password_res) return false;
    // if (password_res == password_hash) return true;
    // return false;
}

// async function generateSalt() {
//     var rounds = 12;
//     return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
// };

// async function hash(plain) {
//     let hash = crypto.createHmac('sha512', "");
//     hash.update(plain);
//     let value = hash.digest('hex');
//     return value;
// }

// async function compare(plain, hashed) {
//     var plainhash = await hash(plain);
//     if (plainhash == hashed) return true;
//     return false;
// }

module.exports = { isLogged }