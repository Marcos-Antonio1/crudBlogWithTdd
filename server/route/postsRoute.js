const express  = require('express')
const router = express.Router();
const postServices = require('../services/postServices');
router.get('/posts',async function(req,res){
    const posts = await postServices.getPosts();
    res.json(posts);
} );

router.post('/posts',async function(req,res){
    const post= req.body;
    const   newpost = await postServices.savePost(post)
    res.json(newpost)

} );

router.put('/posts/:id',async function(req,res){
    const post= req.body;
    await  postServices.updatePost(req.params.id,post)
    res.end()
})

router.delete('/posts/:id',async function(req,res){
    await postServices.deletePost(req.params.id);
    res.end()
} );


module.exports=router;
