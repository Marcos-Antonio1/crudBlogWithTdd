const axios = require('axios');
const { response } = require('express');
const crypt = require('crypto');
const postService = require ('../services/postServices');
const { post } = require('../route/postsRoute');

const generate = function(){
    return crypt.randomBytes(20).toString('hex');
}

const request =function (url,method,data){
    return axios({
        url,
        method,
        data
    })
}

test('should get posts',async function(){
    // given - dado que 
    const post1= await postService.savePost({ title:generate(),content:generate()})
    const post2= await postService.savePost({ title:generate(),content:generate()})
    const post3= await postService.savePost({ title:generate(),content:generate()})
    // when - quando acontecer alguma coisa 
     await request('http://localhost:3000/posts','get');
    const posts= response.data;
    // then - então 
    expect(post).toHaveLength(1);
    await postService.deletePost(post1.id);
    await postService.deletePost(post2.id);
    await postService.deletePost(post3.id);
});

test('should save post',async function () { 
    const data = { title:generate() , content:generate() }
    const response= await request('http://localhost:3000/posts','post',data) 
    const posts= response.data;
    expect(posts.title).toBe(data.title)
    expect(posts.content).toBe(data.content)
    await postService.deletePost(posts.id);
})

test('should update a  post',async function () { 
    const post = await postService.savePost({ title: generate(), content: generate() })
    post.title= generate()
    post.content = generate()    
    await request(`http://localhost:3000/posts/${post.id}`,'put',post)
    const updatePost = await  postService.getPost(post.id);
    expect(updatePost.title).toBe(updatePost.title);
    expect(updatePost.content).toBe(updatePost.content);
    await  postService.deletePost(post.id)
})

test('should delete a post', async function(){
    const post = await postService.savePost({ title: generate(), content: generate() })
    await request(`http://localhost:3000/posts/${post.id}`,'delete',post)
    const posts = await postService.getPosts();
    expect(posts).toHaveLength(0);
})