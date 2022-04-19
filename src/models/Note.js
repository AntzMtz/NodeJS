const mongoose =  require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
titulo:{type: String, required:true},
descripcion:{type: String, required:true},
fecha:{type: Date, default: Date.now},
usuario:{type: String}
});

module.exports = mongoose.model('Note',NoteSchema)