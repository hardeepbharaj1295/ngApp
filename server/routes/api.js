const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const Video = require('../models/video');
/**
 * MongoDb connection String
 */
const db = "mongodb://userroot:root@ds143081.mlab.com:43081/videoplayer";
mongoose.Promise = global.Promise;

/**
 * MongoDB Connection Establishment
 */
mongoose.connect(db ,{useMongoClient : true,}, function(err){
    if(err){
        console.error("Error ! "+err);
    }
    else{
        console.log("Connection Establish");
    }
});

/**
 * get method used to get the data
 * Used for get the request all data and response from dB
 */
router.get('/videos',function(req,res){
    console.log("Request for all videos");
    Video.find({})
    .exec(function(err,videos){
        if(err){
            console.log("Error while data reteriving" + err);
        }
        else{
            res.json(videos);
        }
    });
});

/**
 * get method is used to get the data 
 * Use a particular data from database
 */
router.get('/videos/:id',function(req,res){
    console.log("Request for a single video");
    Video.findById(req.params.id)
    .exec(function(err,videos){
        if(err){
            console.log("Error while data reteriving" + err);
        }
        else{
            res.json(videos);
        }
    });
});

/**
 * post method is used to insert the data
 * Insert a data into the database
 */
router.post('/video',function(req,res){
    console.log('Post a video into DB');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err,insertedVideo){
        if(err){
            console.log("Data Insertion error : "+ err);
        }
        else{
            res.json(insertedVideo);
        }
    }); 
});

/**
 * put request used to update a data
 * findbyidandupdate take 4 args
 * first arg id 
 */
router.put('/video/:id', function(req,res){
    console.log('Update a video');
    Video.findByIdAndUpdate(req.params.id,
    {
        $set : {title : req.body.title, url : req.body.url, description : req.body.description}
    },
    {
        new : true
    },
    function(err,updatedVideo){
        if(err){
            res.send("Error updating Video : "+ err);
        }
        else{
            res.json(updatedVideo);
        }
    }
    );
});

/**
 * delete used to delete a data 
 */
router.delete('/video/:id',function(req,res){
    console.log('Deleting a video from DB');
    Video.findByIdAndRemove(req.params.id,function(err,deletedVideo){
        if(err){
            res.send("Error deleting video : "+ err);
        }
        else{
            res.json(deletedVideo);
        }
    });
});
module.exports = router;