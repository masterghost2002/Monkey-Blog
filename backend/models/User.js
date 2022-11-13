const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    themeSide:{
        type: String,
        default: 'light'
    },
    blogs:[{type: mongoose.Types.ObjectId, ref:"blog", required:true}]
});

module.exports = mongoose.model('user', userSchema);