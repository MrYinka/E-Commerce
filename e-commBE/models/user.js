const mongoose = require('mongoose');
//Password Hashing
const crypto = require('crypto');
//Unique String
const uuidv1 = require('uuidv1');


const userSchema = new mongoose.Schema({
        firstname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: 32
        },
        hashed_password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },

        salt: String,

        role:{
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        }
    }, {timestamps: true}
);

//Virtual Field
userSchema.virtual('password')
    .set(function(password) {
        //Create temporary variable called password
        this._password =  password;
        //Generate a timestamp
        this.salt = uuidv1();
        //Encrypt the password
        this.hashed_password = this.encryptPassword(password);

    })
    .get(function (){
        return this._password;
    });

//Methods
userSchema.methods = {

    //Authenticate user
    authenticate: function(plainText){
        return this.encryptPassword(plainText) == this.hashed_password;
    },

    //Password Encryption
    encryptPassword: function (password){
        if(!password) return  "";
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }catch (e) {
            return "";
        }
    }
};

module.exports = mongoose.model('User', userSchema);


