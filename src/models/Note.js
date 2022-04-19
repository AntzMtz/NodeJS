const mongoose =  require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
titulo:{type: String, required:true},
descripcion:{type: String, required:true},
fecha:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Note',NoteSchema)