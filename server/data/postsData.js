const database = require ('../infra/database');

exports.getPosts= function (){
    return database.query('select * from post');
}

exports.savePost= function(post){
    return database.one('insert into post (title,content) VALUES ($1,$2) RETURNING *',[post.title,post.content]) 
}

exports.updatePost = function (id,post){
    return database.none('update post set title= $1, content= $2 where id= $3',[post.title,post.content,id])
}

exports.deletePost = function(id){
    return database.none('delete from post where id= $1',[id]);
}

exports.getPost= function (id){
    return database.oneOrNone(' select * from  post where id= $1',[id])
}