const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authGuard = require('../auth/auth-guard');

const Post = require('../models/post');

router.get('/', authGuard, (req, res, next) => {
    Post.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        
    })
});

router.get('/:postId', authGuard,(req, res, next) => {
    const id = req.params.productId;
    Post.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

router.post('/', authGuard, (req, res, next) => {    
    console.log(req);
    
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        content: req.body.content,
        lits: req.body.lits,
        canDoALit: req.body.canDoALit,
        shits: req.body.shits,
        canDoAShit: req.body.canDoAShit,
        comments: req.body.comments,
        timestamp: req.body.timestamp
    });
    console.log(req.body);
    post.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling Post",
                postcreated: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}); 

router.get('/:postId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'special Id'
        });
   
    } else {
        res.status(200).json({
            message: 'wrong ID'
        });
    }
});

router.patch('/:postId', (req, res, next) => {
    const id = req.params.postId;  
    console.log(req.body);
    
    Post.update({_id: id}, {$set: req.body})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
        
    })
});
router.delete('/:postId', (req, res, next) => {
    const id = req.params.postId;
    Post.remove({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
        
    })
});

module.exports = router;