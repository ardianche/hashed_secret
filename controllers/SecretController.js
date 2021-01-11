
const Secret = require('../models/secret');
const crypto = require('crypto');
hash = crypto.getHashes(); 


exports.create = function (req, res) {
    let timestamp = new Date();

    if (req == null) {
        throw new Error('Request body is invalid!');
    }
    try {
        let {
            secret,
            expireAfterViews,
            expireAfter
        } = req.body;

        let secretBody = {
            url:crypto.createHash('sha1').update(secret).digest('hex'),
            secretText: secret, 
            expiresAt: new Date(timestamp.getTime() + expireAfter * 6000),
            createdAt: new Date(),
            remainingViews: expireAfterViews,
        }


        let newSecret = new Secret(secretBody);

        newSecret.save(function (err, secret) {
            if (err) {
                res.status(400).send('Unable to save Secret to database');
            } else {
                secretObject = secret;
                res.status(200).send(secret);
            }
        });
    } catch (err) {
        throw new Error('Unable to save Secret to database');
    };
}

exports.list = function (hashParam, res) {
    if (hashParam == null) throw new Error('Hash key cannot be null');
    try {
        Secret.find({
            "hash": hashParam,
            "remainingViews":{
                $gt:0
            },
            "expiresAt":{
                $gt: new Date()
            }
        }, function (err, doc) {
            if (err) res.send(500, err);
            let secret = doc;
            secret
                .forEach((secretItem, index) => {
                    Secret.updateOne(secretItem, {
                        $set: {
                            remainingViews: secretItem.remainingViews - 1
                        }
                    }, (err, raw) => {
                    });
                });
            // secret = secret.filter((item) => {
            //     if(item.remainingViews > 0){
            //         let expiresAt = new Date(item.expiresAt).getTime();
            //         let currentDate = new Date().getTime();
            //         if(expiresAt > currentDate) {
            //             return item;
            //         }
            //     }
            // });
            res.status(200).send(secret);
            return secret;
        });
    } catch (err) {
        res.status(400).send([]);
        throw new Error('Couldnt find any secret with that hash');
    }
};

exports.getSecretFromUrl = function(url,res) {
    if (url == null) throw new Error('URL cannot be null');
    try {
        Secret.find({
            "url": url,
        }, function (err, doc) {
            if (err) res.send(500, err);
            let secret = doc;
            secret
                .forEach((secretItem, index) => {
                    Secret.updateOne(secretItem, {
                        $set: {
                            remainingViews: secretItem.remainingViews - 1
                        }
                    }, (err, raw) => {
                    });
                });
            res.status(200).send(secret);
            return secret;
        });
    } catch (err) {
        res.status(400).send([]);
        throw new Error('Couldnt find any secret with that hash');
    }
}

exports.findSecret = function (hashParam) {
    let secret;
    Secret.find({ "hash": hashParam }, ((err, doc) => {
        if (err) throw new Error('Couldnt find any secret with that hash');
        secret = doc;
    }));
    return secret;
}

exports.findAll = function (req, res) {
    try {
        Secret.find({
            "remainingViews":{
                $gt:0
            },
            "expiresAt":{
                $gt: new Date()
            }
        }, function (err, doc) {
            if (err) res.send(500, err);
            let secret = doc;
            secret
                .forEach((secretItem, index) => {
                    Secret.updateOne(secretItem, {
                        $set: {
                            remainingViews: secretItem.remainingViews - 1
                        }
                    }, (err, raw) => {
                    });
                });
            // secret = secret.filter((item) => {
            //     if(item.remainingViews > 0){
            //         let expiresAt = new Date(item.expiresAt).getTime();
            //         let currentDate = new Date().getTime();
            //         if(expiresAt > currentDate) {
            //             return item;
            //         }
            //     }
            // });
            res.status(200).send(secret);
            return secret;
        });
    } catch (err) {
        res.status(400).send([]);
        throw new Error('Couldnt find any secret with that hash');
    }
};