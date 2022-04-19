const mongoose =  require('mongoose');
const { Schema } = mongoose;
const encrip = require('bcryptjs');

const Users = new Schema({
nombre:{type: String, required:true, unique:true},
password:{type: String, required:true},
correo:{type: String, required:true}
});

Users.methods.encriptpass = async (password)=>{
    const salt = await encrip.genSalt(10);
    const hash = encrip.hash(password,salt);
    return hash;
};

Users.methods.desencpassword = async function (password1) {
    return await encrip.compare(password1, this.password);
};

module.exports = mongoose.model('Users',Users)