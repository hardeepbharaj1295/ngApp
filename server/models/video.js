const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * This is the blueprint or Schema
 * that crearte monogoDb
 */

const videoSchema = new Schema({
    title: String,
    url: String,
    description: String
});

/**
 * create the model of video Schema
 * video 'name of the model'
 * videos 'name of the collection in mongoDB'
 */

module.exports = mongoose.model('video',videoSchema,'videos');