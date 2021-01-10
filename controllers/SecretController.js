
const Secret = require('../models/secret');


exports.create = function (req, res) {
    let timestamp = new Date();

    if(req == null){
        throw new Error('Request body is invalid!');
    }
    try{
        let {
            secret,
            expireAfterViews,
            expireAfter
        } = req.body;
    
        let secretBody = {
            secretText : secret,
            expiresAt : new Date(timestamp.getTime() + expireAfter*6000),
            createdAt : new Date(),
            remainingViews : expireAfterViews, 
        }
    
        var newSecret = new Secret(secretBody);
    
        let secretObject = {};
    
        newSecret.save(function (err,secret) {
        if(err) {
            res.status(400).send('Unable to save Secret to database');
        } else {
            secretObject = secret;
            res.status(200).send(secret);
        }
      });
    }catch(err){
        throw new Error('Unable to save Secret to database');
    };
}

exports.list = function (hashParam, res) {
    if(hashParam == null) throw new Error('Hash key cannot be null');
    try{
        Secret.find({
            "hash" : hashParam
        },function (err,doc) {
            if(err) res.send(500,err);
            res.status(200).send(doc);
            return doc;
        });
    }catch(err) {
        throw new Error('Couldnt find any secret with that hash');
    }
};

exports.findSecret = function(hashParam){
    let secret;
    Secret.find({"hash" : hashParam}, ((err,doc) => {
        if(err) throw new Error('Couldnt find any secret with that hash');
        secret = doc;
    }));
    return secret;
}

exports.findAll = function (req, res) {
    try{
        Secret.find({},function (err,doc) {
            if(err) res.send(500,err);
            res.status(200).send(doc);
            return doc;
        });
    }catch(err) {
        throw new Error('Couldnt find any secret with that hash');
    }
};