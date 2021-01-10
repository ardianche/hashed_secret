const express = require('express');
const router = express.Router();
const secret = require('../controllers/SecretController');

router.get('/',(req,res)=>{
    secret.findAll(req,res);
});

router.get('/:hash', function(req, res){
    secret.list(req.params.hash,res);
});

router.post('/', function(req, res) {
    secret.create(req,res);
});

module.exports = router;
