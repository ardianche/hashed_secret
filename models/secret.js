const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Secret = new Schema ({
        hash: { type: String, required: false, default:'CanusLupus-FantasticMrFox'},
        secretText: { type: String, required: true},
        createdAt: {type: Date, required:false},
        expiresAt: {type: Date,required:false},
        remainingViews:{type: Number, required:false}
});

module.exports = mongoose.model('Secret', Secret)
