const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
var insertCoupon = new Schema({
    coupon : { type: String, required: true }

});

